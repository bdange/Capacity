const Client = require("./models").Client;
const bcrypt = require("bcryptjs");

module.exports = {
  createClient(newClient, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newClient.password, salt);

    return Client.create({
      email: newClient.email,
      password: hashedPassword
    })
      .then(client => {
        callback(null, client);
      })
      .catch(err => {
        callback(err);
      });
  }
};
