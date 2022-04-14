const WaterAlertService = require("../../DomainLayer/Services/waterAlertService");
const PermissionMiddleWare = require("../permissionMiddleWare");

function WeatherController(app) {
  app.put("/waterAlert", PermissionMiddleWare.isAdmin, (req, res) => {
    try {
      new WaterAlertService()
        .addWaterAlert(req.body)
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

  app.get("/waterAlert", PermissionMiddleWare.isAuthenticated, (req, res) => {
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

  app.get("/waterAlert/:id", PermissionMiddleWare.isAuthenticated, (req, res) => {
    try {
      new WaterAlertService()
        .getWaterAlert(req.params.id)
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

module.exports = WeatherController;
