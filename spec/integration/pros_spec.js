const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/pros/";
const Pro = require("../../src/db/models").Pro;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes: pros", () => {
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

  describe("GET /pros", () => {
    it("should render an info view", done => {
      request.get(base, (err, res, body) => {
        expect(err).toBeNull();
        done();
      });
    });
  });

  describe("GET /pros/sign_up", () => {
    it("should render a view with a sign up form", done => {
      request.get(`${base}sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign up");
        done();
      });
    });
  });

  describe("POST /pros", () => {
    it("should create a new user with valid values and redirect", done => {
      const options = {
        url: base,
        form: {
          email: "pro@example.com",
          password: "123456789"
        }
      };

      request.post(options, (err, res, body) => {
        Pro.findOne({ where: { email: "pro@example.com" } })
          .then(pro => {
            expect(pro).not.toBeNull();
            expect(pro.email).toBe("pro@example.com");
            expect(pro.email).toBe(1);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });

    it("should not create a new user with invalid attributes and redirect", done => {
      request.post(
        {
          url: base,
          form: {
            email: "no",
            password: "123456789"
          }
        },
        (err, res, body) => {
          Pro.findOne({ where: { email: "no" } }).then(pro => {
            expect(pro).toBeNull();
            done();
          });
        }
      );
    });
  });

  describe("GET /pros/sign_in", () => {
    it("should render a view with a sign in form", done => {
      request.get(`${base}sign_in`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toBeNull();
        expect(body).toContain("Sign in");
        done();
      });
    });
  });

  describe("GET /pros/sign_in", () => {
    it("should render a view with a sign in form", done => {
      request.get(`${base}sign_in`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Sign in");
        done();
      });
    });
  });
});
