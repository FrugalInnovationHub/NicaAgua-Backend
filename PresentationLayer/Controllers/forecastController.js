const ForecastService = require("../../DomainLayer/Services/forecastService");
const PermissionMiddleWare = require("../permissionMiddleWare");

function ForecastController(app) {
    app.put('/shortTerm', PermissionMiddleWare.isAdmin, (req, res) => {
        try {
            new ForecastService().addForecast(req.body).then(
                (r) => res.send(r))
                .catch((e) => {
                    console.log(e);
                    res.statusCode = 500;
                    res.send(e);
                });
        }
        catch (e) {
            res.statusCode = 400;
            res.send(e);
        }
    })


    app.get('/shortTerm/:community', PermissionMiddleWare.isAuthenticated, (req, res) => {
        try {
            new ForecastService().getForecast(req.params.community).then(
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


    app.get('/shortTerm', PermissionMiddleWare.isAuthenticated, (req, res) => {
        try {
            new ForecastService().getForecast("*").then(
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

module.exports = ForecastController