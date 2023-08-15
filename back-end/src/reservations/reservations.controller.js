const service = require("./reservations.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

// all CRUD functions below here

//list reservations
async function list(req, res) {
  const { date, mobile_number } = req.query;
  let reservations;
  if (mobile_number) {
    reservations = await service.search(mobile_number);
  } else {
    reservations = date ? await service.listByDate(date) : await service.list();
  }
  res.json({
    data: reservations,
  });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
