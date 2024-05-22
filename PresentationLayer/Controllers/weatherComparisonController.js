const PermissionMiddleWare = require("../permissionMiddleWare");

function WeatherComparisonController(app) {

  app.get("/comparison", PermissionMiddleWare.isAuthenticated, (req, res) => {
    try {
      new WaterAlertService()
        .getWaterAlerts(req.query)
        .then((r) => res.send(r))
        .catch((e) => {
          res.statusCode = 401;
          res.send(e);
        });
    } catch (e) {
      res.statusCode = 400;
      res.send(e);
    }
  });
}

module.exports = WeatherComparisonController;
