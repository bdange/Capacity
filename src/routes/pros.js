const express = require("express");
const router = express.Router();
const prosController = require("../controllers/prosController");

router.get("/pros", prosController.index);

module.exports = router;
