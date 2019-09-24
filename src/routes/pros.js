const express = require("express");
const router = express.Router();
const validation = require("./validation");
const prosController = require("../controllers/prosController");

router.get("/pros", prosController.index);

router.get("/pros/sign_up", prosController.signUp);

router.post("/pros", validation.validatePro, prosController.create);

router.get("/pros/sign_in", prosController.signInForm);
router.post("/pros/sign_in", validation.validatePro, prosController.signIn);

router.get("/pros/sign_out", prosController.signOut);

module.exports = router;
