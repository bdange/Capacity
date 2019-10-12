const express = require("express");
const router = express.Router();
const helper = require("../auth/helpers");

const listingController = require("../controllers/listingController");

router.get("/listings/index", listingController.index);
router.post("/listings/:id", listingController.sendForm);

router.get("/listings/new", listingController.new);

router.post(
  "/listings/create",
  helper.ensureAuthenticated,
  listingController.create
);

router.get("/listings/:id", listingController.show);

router.post("/listings/:id/destroy", listingController.destroy);

router.get("/listings/:id/edit", listingController.edit);

router.post("/listings/:id/update", listingController.update);

module.exports = router;
