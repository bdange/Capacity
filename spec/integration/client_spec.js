const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/client/";
const Client = require("../../src/db/models").Client;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes: client", () => {
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
  describe("GET /client/sign_up", () => {
    it("should render a view with a sign up form", done => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign up");
        done();
      });
    });
  });

  describe("POST /client", () => {
    it("should create a new client with valid values and redirect", done => {
      const options = {
        url: base,
        form: {
          email: "client@example.com",
          password: "1234567890"
        }
      };
      request.post(options, (err, res, body) => {
        Client.findOne({ where: { email: "client@example.com" } })
          .then(client => {
            expect(client).not.toBeNull();
            expect(client.email).toBe("client@example.com");
            expect(client.id).toBe(1);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });

    it("should not create a new user with invalid attribut and redirect", done => {
      request.post(
        {
          url: base,
          form: {
            email: "no",
            password: "123456789"
          }
        },
        (err, res, body) => {
          Client.findOne({ where: { email: "no" } })
            .then(client => {
              expect(client).toBeNull();
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        }
      );
    });
  });
});
