const express = require("express");
const router = express.Router();
const prosController = require("../controllers/prosController");

router.get("/pros", prosController.index);
router.post("/pros/contact", prosController.nodemailer);

module.exports = router;
