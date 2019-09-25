const express = require("express");
const router = express.Router();
const clientController = require("../controllers/clientController");

router.get("/client", clientController.index);

module.exports = router;
