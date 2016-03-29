module.exports = function (app) {
    var express = require('express');
    var donorsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    donorsRouter.use(bodyParser.json());

    // Create an embedded table using NEDB if it doesn't exist yet
    var nedb = require('nedb');
    var donorDB = app.donorDB;

    donorsRouter.get('/', function (req, res) {
        delete req.query["_"];
        donorDB.find(req.query).exec(function (error, donors) {
            res.send({
                'donors': donors
            })
        })
    });

    donorsRouter.post('/', function (req, res) {
        // Look for the most recently created record
        donorDB.find({}).sort({id: -1}).limit(1).exec(function (err, donors) {

            console.log(req.body.donor);
            if (donors.length != 0)
                req.body.donor.id = donors[0].id + 1;
            else
                req.body.donor.id = 1;

            // Insert the new record
            donorDB.insert(req.body.donor, function (err, newDonation) {
                res.status(201);
                res.send(JSON.stringify({donor: newDonation}));
            })
        });
    });

    donorsRouter.post('/login', function (req, res) {
        var login = req.body.login;
        var password = req.body.password;

        // FIXME:  should check password as well
        donorDB.find({login: login}).limit(1).exec(function (err, donors) {
            var RESTFUL_AUTH_TOKEN = "RESTFUL_AUTH_TOKEN:" + login;

            if (donors.length != 0) {
                var donorId = donors[0].id;

                res.status(200);
                res.send(JSON.stringify({token: RESTFUL_AUTH_TOKEN, donorId: donorId}));
            }
            else {
                res.status(500);
                res.send(JSON.stringify({token: RESTFUL_AUTH_TOKEN, donorId: null}));
            }
        });
    });

    donorsRouter.get('/:id', function (req, res) {
        donorDB.find({id: req.params.id}).exec(function (error, donors) {
            if (donors.length > 0)
                res.send({
                    'donor': donors[0],
                    'status': true
                });
            else
                res.send({
                    'status': false
                });
        });
    });

    // No changes from here on down
    donorsRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    donorsRouter.put('/:id', function (req, res) {
        res.send({
            'donors': {
                id: req.params.id
            }
        });
    });

    donorsRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/api/donors', donorsRouter);
};
