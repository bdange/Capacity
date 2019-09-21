module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const prosRoutes = require("../routes/pros");
    const clientRoutes = require("../routes/client");

    app.use(staticRoutes);
    app.use(prosRoutes);
    app.use(clientRoutes);
  }
};
