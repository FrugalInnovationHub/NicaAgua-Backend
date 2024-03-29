const LongTermForeCastService = require("../../DomainLayer/Services/longTermForecastService");
const PermissionMiddleWare = require("../permissionMiddleWare");

function LongTermForecastController(app) {
    app.put('/longTerm', PermissionMiddleWare.isAdmin, (req, res) => {
        try {
            new LongTermForeCastService().addForecast(req.body).then(
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

    app.get('/longTerm/:community', PermissionMiddleWare.isAuthenticated, (req, res) => {
        try {
            new LongTermForeCastService().getForecasts("El Naranjito").then(
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

    app.get('/longTerm', PermissionMiddleWare.isAuthenticated, (req, res) => {
        try {
            new LongTermForeCastService().getForecasts("*").then(
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

    app.delete('/longTerm', PermissionMiddleWare.isAuthenticated, (req, res) => {
        try {
            new LongTermForeCastService().deleteForecast(req.body.id).then(
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

module.exports = LongTermForecastController