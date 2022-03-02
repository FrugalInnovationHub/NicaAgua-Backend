const RegionService = require("../../DomainLayer/Services/regionService");
const PermissionMiddleWare = require("../permissionMiddleWare");

function RegionsController(app) {
    app.put('/region', PermissionMiddleWare.isAdmin, (req, res) => {
        try {
            new RegionService().addRegion(req.body).then(
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

    app.get('/region', PermissionMiddleWare.isAuthenticated, (req, res) => {
        try {
            new RegionService().getRegions().then(
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

    app.delete('/region', PermissionMiddleWare.isAdmin, (req, res) => {
        new RegionService().deleteRegion(req.body.code).then(
            (r) => res.send(r))
            .catch((e) => {
                res.statusCode = 400;
                res.send(e);
            });
    })
}

module.exports = RegionsController