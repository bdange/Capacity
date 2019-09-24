const sequelize = require("../../src/db/models/index").sequelize;
const Pro = require("../../src/db/models").Pro;

describe("Pro", () => {
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
    it("should create a Pro object with a valid email and password", done => {
      Pro.create({
        email: "pro@example.com",
        password: "1234567890"
      }).then(pro => {
        expect(pro.email).toBe("pro@example.com");
        expect(pro.id).toBe(1);
        done();
      });
    });

    it("should not create a pro with invalid email or password", done => {
      Pro.create({
        email: "whatever works",
        password: "1234567890"
      })
        .then(pro => {
          // won't be further evaluated
          done();
        })
        .catch(err => {
          expect(err.message).toContain(
            "Validation error: must be a valid email"
          );
          done();
        });
    });
    it("should not create a user with an email already taken", done => {
      Pro.create({
        email: "pro@example.com",
        password: "1234567890"
      })
        .then(pro => {
          Pro.create({
            email: "pro@example.com",
            password: "whatever you want"
          })
            .then(pro => {
              // no further evaluation
              done();
            })
            .catch(err => {
              expect(err.message).toContain("Validation error");
              done();
            });
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });
});
