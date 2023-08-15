const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Validation Functions

const VALID_PROPERTIES = [
  "table_id",
  "table_name",
  "capacity",
  "reservation_id",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  next();
}

function hasProperties(...properties) {
  return function (res, req, next) {
    const { data = {} } = res.body;

    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const hasRequiredProperties = hasProperties("table_name", "capacity");

function validCapacity(req, res, next) {
  const capacity = req.body.data.capacity;
  if (typeof capacity !== "number") {
    return next({
      status: 400,
      message: "capacity must be a number.",
    });
  }
  return next();
}

function validTableName(req, res, next) {
  const tableName = req.body.data.table_name;
  if (tableName.length <= 1) {
    next({
      status: 400,
      message: "table_name must be longer than one character",
    });
  }
  next();
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;
  const table = await service.read(table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table id ${table_id} cannot be found.`,
  });
}

async function reservationIdExists(req, res, next) {
  const reservation_id = req.body.data.reservation_id;
  const reservation = await service.readReservation(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `reseravation ${reservation_id} does not exist.`,
  });
}

const hasReservationId = hasProperties("reservation_id");

async function validTableCapacity(req, res, next) {
  const capacity = res.locals.table.capacity;
  const party = res.locals.reservation.people;
  if (capacity < party) {
    return next({
      status: 400,
      message: `Table does not have sufficient capacity`,
    });
  }
  return next();
}

async function tableIsUnoccupied(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (reservation_id) {
    return next({
      status: 400,
      message: `Table is occupied`,
    });
  }
  return next();
}

async function tableIsOccupied(req, res, next) {
  const { reservation_id } = res.locals.table;
  if (!reservation_id) {
    return next({
      status: 400,
      message: `Table is not occupied`,
    });
  }
  return next();
}

function statusNotSeated(req, res, next) {
  const { status } = res.locals.reservation;
  if (status === "seated") {
    return next({
      status: 400,
      message: `reservation status is ${status}`,
    });
  }
  next();
}

//CRUDL

async function create(req, res, next) {
  const newTable = { ...req.body.data };
  const data = await service.create(newTable);
  res.status(201).json({ data });
}

async function list(req, res) {
  const data = await service.list();
  res.json({ data: data });
}

async function update(req, res) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };
  const data = await service.update(updatedTable);
  res.status(200).json({ data });
}

async function destroy(req, res) {
  const table_id = res.locals.table.table_id;
  const data = await service.destroy(table_id);
  res.sendStatus(204);
}

async function deleteSeatAssignment(req, res) {
  const { table_id, reservation_id } = res.locals.table;
  const status = "finished";
  await service.updateStatus(reservation_id, status);
  await service.deleteSeatAssignment(table_id);
  res.status(200).json({});
}

async function updateStatusToSeated(req, res, next) {
  const updatedReservation = {
    ...res.locals.reservation,
    status: "seated",
  };
  await service.updateStatus(
    updatedReservation.reservation_id,
    updatedReservation.status
  );
  next();
}

module.exports = {
  create: [
    hasOnlyValidProperties,
    hasRequiredProperties,
    validCapacity,
    validTableName,
    asyncErrorBoundary(create),
  ],
  list: [asyncErrorBoundary(list)],
  update: [
    hasOnlyValidProperties,
    tableExists,
    hasReservationId,
    reservationIdExists,
    validTableCapacity,
    statusNotSeated,
    tableIsUnoccupied,
    updateStatusToSeated,
    asyncErrorBoundary(update),
  ],
  deleteSeatAssignment: [
    tableExists,
    tableIsOccupied,
    asyncErrorBoundary(deleteSeatAssignment),
  ],
  delete: [tableExists, asyncErrorBoundary(destroy)],
};