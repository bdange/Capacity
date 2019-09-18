module.exports = {
  init(app) {
    const staticRoutes = require("../routes/static");
    const prosRoutes = require("../routes/pros");

    app.use(staticRoutes);
    app.use(prosRoutes);
  }
};
