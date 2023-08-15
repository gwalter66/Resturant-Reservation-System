const knex = require("../db/connection");


/** creates a new table (row) */
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*");
}

/** reads a table given the table_id */
function read(table_id) {
  return knex("tables")
    .select("*")
    .where({ table_id: table_id })
    .first();
}

/** updates reservation status given the reservation_id */
function updateReservation(reservation_id, status) {
  return knex("reservations")
    .where({ reservation_id: reservation_id })
    .update({ status: status });
}

/** lists all tables. */
function list() {
  return knex("tables")
    .select("*")
    .orderBy("table_name");
}


/** reads reservation given the reservation_id. */
function readReservation(reservation_id) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservation_id })
    .first();
}

function occupy(table_id, reservation_id) {
  return knex("tables")
    .where({ table_id: table_id })
    .update({ reservation_id: reservation_id, status: "occupied" });
}

function free(table_id) {
  return knex("tables")
    .where({ table_id: table_id })
    .update({ reservation_id: null, status: "free" });
}

module.exports = {
  list,
  create,
  read,
  occupy,
  free,
  readReservation,
  updateReservation,
};