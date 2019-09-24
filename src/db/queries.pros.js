const Pro = require("./models").Pro;
const bcrypt = require("bcryptjs");

module.exports = {
  createPro(newPro, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newPro.password, salt);

    return Pro.create({
      email: newPro.email,
      password: hashedPassword
    })
      .then(pro => {
        callback(null, pro);
      })
      .catch(err => {
        callback(err);
      });
  }
};
