const bcrypt = require("bcryptjs");

module.exports = {
  ensureAuthenticated(req, res, next) {
    if (!req.client) {
      req.flash("notice", "You must be signed in to do that.");
      return res.redirect("/client/sign_in");
    } else {
      next();
    }
  },
  comparePass(clientPassword, databasePassword) {
    return bcrypt.compareSync(clientPassword, databasePassword);
  }
};
