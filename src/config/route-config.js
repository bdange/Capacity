module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const prosRoutes = require("../routes/pros");
    const clientRoutes = require("../routes/client");
    const userRoutes = require("../routes/users");

    app.use(staticRoutes);
    app.use(prosRoutes);
    app.use(clientRoutes);
    app.use(userRoutes);
  }
};
