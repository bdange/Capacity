const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Client = require("../db/models").Client;
const Pro = require("../db/models").Pro;
const authHelper = require("../auth/helpers");

module.exports = {
  init(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
      new LocalStrategy(
        {
          usernameField: "email"
        },
        (email, password, done) => {
          Client.findOne({
            where: { email }
          }).then(client => {
            if (!client || !authHelper.comparePass(password, client.password)) {
              return done(null, false, {
                message: "invalid email or password"
              });
            }
            return done(null, client);
          });
        }
      )
    );
    passport.serializeUser((client, callback) => {
      callback(null, client.id);
    });

    passport.deserializeUser((id, callback) => {
      Client.findByPk(id)
        .then(client => {
          callback(null, client);
        })
        .catch(err => {
          callback(err, client);
        });
    });
  },
  initPro(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
      new LocalStrategy(
        {
          usernameField: "email"
        },
        (email, password, done) => {
          Pro.findOne({
            where: { email }
          }).then(pro => {
            if (!pro || !authHelper.comparePass(password, pro.password)) {
              return done(null, false, {
                message: "Invalid email or passowrd"
              });
            }
            return done(null, pro);
          });
        }
      )
    );
    passport.serializeUser((pro, callback) => {
      callback(null, pro.id);
    });

    passport.deserializeUser((id, callback) => {
      Pro.findByPk(id)
        .then(pro => {
          callback(null, pro);
        })
        .catch(err => {
          callback(err, pro);
        });
    });
  }
};
