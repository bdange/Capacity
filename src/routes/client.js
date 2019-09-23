const express = require("express");
const router = express.Router();
const validation = require("./validation");
const clientController = require("../controllers/clientController");

router.get("/client", clientController.index);

router.post("/client", validation.validateClient, clientController.create);

router.get("/client/sign_up", clientController.signUp);

router.get("/client/sign_in", clientController.signInForm);
router.post(
  "/client/sign_in",
  validation.validateClient,
  clientController.signIn
);

router.get("/client/sign_out", clientController.signOut);

module.exports = router;
