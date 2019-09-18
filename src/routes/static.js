const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");

router.get("/", staticController.index);
router.get("/informations", staticController.informations);

module.exports = router;
