const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Client = require("../db/models").Client;
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
          callback(err, client);
        })
        .catch(err => {
          callback(err, client);
        });
    });
  }
};
