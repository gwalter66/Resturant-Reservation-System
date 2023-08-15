const { select } = require("../db/connection");
const knex = require("../db/connection");

// create a new reservation
function create(reservation) {
    return knex("reservations as r")
        .insert(reservation)
        .returning("*")
        .then((newReservation) => newReservation[0]);
}

//list all reservations not finsihed or cancelled ordered by reservation_date
function list() {
    return knex("reservations")
        .select("*")
        .whereNotIn("status", ["finished", "cancelled"])
        .orderBy("reservations.reservation_date")
}

module.exports = {
    create,
    list,
}