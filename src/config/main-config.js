require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const passportConfig = require("./passport-config");
const session = require("express-session");
const flash = require("express-flash");
const nodemailer = require("nodemailer");
const multer = require("multer");
const aws = require("aws-sdk");
const multers3 = require("multer-s3");

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, new Date().getTime() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

module.exports = {
  init(app, express) {
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(
      "/images",
      express.static(path.join(__dirname, "..", "..", "images"))
    );
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      multer({
        storage: fileStorage,
        limits: { fieldSize: 1024 * 1024 * 1 },
        fileFilter: fileFilter
      }).array("image", 2)
    );
    app.use(expressValidator());
    app.use(
      session({
        secret: process.env.cookieSecret,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1.21e9 }
      })
    );
    app.use(flash());
    passportConfig.init(app);

    app.use((req, res, next) => {
      res.locals.currentUser = req.user;
      next();
    });
  }
};
