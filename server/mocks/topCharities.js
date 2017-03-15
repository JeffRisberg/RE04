const express = require('express');

const topCharitiesRouter = express.Router();

const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    topCharitiesRouter.use(bodyParser.json());

    const topCharityDB = app.topCharityDB;
    const charityDB = app.charityDB;

    topCharitiesRouter.get('/', function (req, res) {
        delete req.query["_"];
        charityDB.find({}, function (error, charities) {

            topCharityDB.find(req.query).exec(function (error, topCharities) {

                // Substitute the charity record for the id field
                topCharities.map(function (tc) {
                    const charityId = tc["charityId"];
                    let charity = null;

                    charities.forEach((c) => {
                        if (c.id == charityId) charity = c;
                    });
                    tc['charity'] = charity;
                });
                res.send({
                    'status': "success",
                    'data': topCharities
                });
            });
        });
    });

    topCharitiesRouter.get('/:id', function (req, res) {
        topCharityDB.find({id: req.params.id}).exec(function (error, topCharities) {
            if (topCharities.length > 0)
                res.send({
                    'status': "success",
                    'data': topCharities[0]
                });
            else {
                res.send({
                    'data': null
                });
            }
        });
    });

    // No changes from here on down
    topCharitiesRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    topCharitiesRouter.put('/:id', function (req) {
        // we never change listCharities
    });

    topCharitiesRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/ws/topCharities', topCharitiesRouter);
};
