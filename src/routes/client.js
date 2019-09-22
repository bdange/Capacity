const express = require("express");
const router = express.Router();
const validation = require("./validation");
const clientController = require("../controllers/clientController");

router.get("/client", clientController.index);
router.get("/client/sign_up", clientController.signUp);

router.post("/client", validation.validateClient, clientController.create);

module.exports = router;
