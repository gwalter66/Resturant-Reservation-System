const { select } = require("../db/connection");
const knex = require("../db/connection");

// create a new reservation
function create(reservation) {
    return knex("reservations as r")
        .insert(reservation)
        .returning("*")
        .then((newReservation) => newReservation[0]);
}

module.exports = {
    create,
}