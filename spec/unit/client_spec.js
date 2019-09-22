const sequelize = require("../../src/db/models/index").sequelize;
const Client = require("../../src/db/models").Client;

describe("Client", () => {
  beforeEach(done => {
    sequelize
      .sync({ force: true })
      .then(() => {
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
  });

  describe("#create()", () => {
    it("should create a Client object with a valid email and password", done => {
      Client.create({
        email: "client@example.com",
        password: "1234567890"
      })
        .then(client => {
          expect(client.email).toBe("client@example.com");
          expect(client.id).toBe(1);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });

    it("should not create a client with invalid email or password", done => {
      Client.create({
        email: "Whatever you want",
        password: "1234567890"
      })
        .then(client => {
          //nothing to evaluate
          done();
        })
        .catch(err => {
          expect(err.message).toContain(
            "Validation error: must be a valid email"
          );
          done();
        });
    });

    it("should not create a client with an email already take", done => {
      Client.create({
        email: "client@example.com",
        password: "1234567890"
      }).then(client => {
        Client.create({
          email: "client@example.com",
          password: "whatever you can imagine"
        })
          .then(client => {
            //nothing to evaluate
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
});
