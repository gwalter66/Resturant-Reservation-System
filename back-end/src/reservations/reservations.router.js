const router = require("express").Router();
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:reservationId")
  .get(controller.read)
  .put(controller.update)
  .all(methodNotAllowed);

router
  .route("/:reservationId/status")
  .put(controller.updateStatus)
  .all(methodNotAllowed);

router
  .route("/:reservationId/edit")
  .put(controller.update)
  .all(methodNotAllowed);

module.exports = router;