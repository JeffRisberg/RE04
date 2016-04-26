module.exports = function (app) {
    var express = require('express');
    var listCharitiesRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    listCharitiesRouter.use(bodyParser.json());

    var listCharityDB = app.listCharityDB;

    listCharitiesRouter.get('/', function (req, res) {
        delete req.query["_"];
        listCharityDB.find(req.query).exec(function (error, listCharities) {
            res.send({
                'status': "ok",
                'data': listCharities
            })
        })
    });

    listCharitiesRouter.get('/listCharities/:id', function (req, res) {
        delete req.query["_"];
        listCharityDB.find(req.query).exec(function (error, listCharities) {
            res.send({
                'status': "ok",
                'data': listCharities
            })
        })
    });

    listCharitiesRouter.get('/:id', function (req, res) {
        listCharityDB.find({id: req.params.id}).exec(function (error, listCharities) {
            if (listCharities.length > 0)
                res.send({
                    'status': "ok",
                    'data': listCharities[0]
                });
            else {
                res.send({
                    'data': null
                });
            }
        });
    });

    // No changes from here on down
    listCharitiesRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    listCharitiesRouter.put('/:id', function (req, res) {
        // we never change listCharities
    });

    listCharitiesRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/ws/listCharities', listCharitiesRouter);
};
