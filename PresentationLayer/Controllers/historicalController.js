const PermissionMiddleWare = require("../permissionMiddleWare");
const HistoricalService = require("../../DomainLayer/Services/historicalService");

function HistoricalController(app) {
    app.get('/historical/:community/:month', (req, res) => {
        try {
            const community = req.params.community;
            const month = req.params.month;
            new HistoricalService().getHistorical(community,month)
            .then((e) => res.send(e))
            .catch((e) => {
                res.statusCode = 401;
                res.send(e.message)
            });
        }
        catch (e) {
            res.statusCode = 400;
            res.send(e.message);
        }
    })
}

module.exports = HistoricalController;
