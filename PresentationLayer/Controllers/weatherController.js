const WeatherService = require("../../DomainLayer/Services/weatherService");
const PermissionMiddleWare = require("../permissionMiddleWare");

function WeatherController(app) {
    app.put('/weather', PermissionMiddleWare.isAdmin, (req, res) => {
        try {
            new WeatherService().addWeatherLog(req.body).then(
                (r) => res.send(r))
                .catch((e) => {
                    res.statusCode = 401;
                    res.send(e);
                });
        }
        catch (e) {
            res.statusCode = 400;
            res.send(e);
        }
    })

    app.get('/weather', PermissionMiddleWare.isAuthenticated, (req, res) => {
        try {
            new WeatherService().getWeatherLogList(req.query).then(
                (r) => res.send(r))
                .catch((e) => {
                    res.statusCode = 401;
                    res.send(e);
                });
        }
        catch (e) {
            res.statusCode = 400;
            res.send(e);
        }
    })

    app.get('/weather/:id', PermissionMiddleWare.isAuthenticated, (req, res) => {
        try {
            new WeatherService().getWeatherLog(req.params.id).then(
                (r) => res.send(r))
                .catch((e) => {
                    res.statusCode = 401;
                    res.send(e);
                });
        }
        catch (e) {
            res.statusCode = 400;
            res.send(e);
        }
    })
}

module.exports =  WeatherController;