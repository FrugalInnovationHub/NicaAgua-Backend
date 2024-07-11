const PermissionMiddleWare = require("../permissionMiddleWare");
const HistoricalService = require("../../DomainLayer/Services/historicalService");

function HistoricalController(app) {
    app.get('/historical', (req, res) => {
        try {
            const community = req.query.community;
            const month = req.query.month;

            if (!community || !month) {
                res.statusCode = 400;
                res.send('Both community and month parameters are required');
                return;
            }
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
    });
    app.post('/historical', (req, res) => {
        try {
            const data = req.body;
            new HistoricalService().addHistoricalData(data)
            .then(() => res.send("Data added successfully"))
            .catch((e) => {
                res.statusCode = 400;
                res.send(e.message);
            });
        }
        catch (e) {
            res.statusCode = 400;
            res.send(e.message);
        }
    });
}

module.exports = HistoricalController;
