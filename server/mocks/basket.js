module.exports = function (app) {
    var express = require('express');
    var basketRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    basketRouter.use(bodyParser.json());

    var transactionDB = app.transactionDB;

    basketRouter.get('/', function (req, res) {
        delete req.query["_"];
        transactionDB.find(req.query).exec(function (error, charities) {
            res.send({
                'data': charities
            })
        })
    });

    app.use('/api/basket', basketRouter);
};
