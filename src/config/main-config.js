require("dotenv").config();
const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const passportConfig = require("./passport-config");
const passportConfigPros = require("./passport-config-pros");
const session = require("express-session");
const flash = require("express-flash");

module.exports = {
  init(app, express) {
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(express.static(path.join(__dirname, "..", "assets")));
    app.use(bodyParser.urlencoded({ extended: true }));
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
    passportConfigPros.init(app);
    app.use((req, res, next) => {
      res.locals.currentClient = req.client;
      next();
    });
    app.use((req, res, next) => {
      res.locals.currentPro = req.pro;
      next();
    });
  }
};
