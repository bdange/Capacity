const express = require("express");
const router = express.Router();

const listingController = require("../controllers/listingController");

router.get("/listings", listingController.index);

router.get("/listings/new", listingController.new);

router.post("/listings/create", listingController.create);

router.get("/listings/:id", listingController.show);

router.post("/listings/:id/destroy", listingController.destroy);

router.get("/listings/:id/edit", listingController.edit);

router.post("/listings/:id/update", listingController.update);

module.exports = router;