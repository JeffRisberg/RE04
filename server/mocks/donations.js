module.exports = function (app) {
    var express = require('express');
    var donationsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    donationsRouter.use(bodyParser.json());

    // Create an embedded table using NEDB if it doesn't exist yet
    var nedb = require('nedb');
    var donationDB = app.donationDB;

    donationsRouter.get('/', function (req, res) {
        delete req.query["_"];
        donationDB.find(req.query).exec(function (error, donations) {
            res.send({
                'donations': donations
            })
        })
    });

    donationsRouter.post('/', function (req, res) {
        // Look for the most recently created record
        donationDB.find({}).sort({id: -1}).limit(1).exec(function (err, donations) {

            console.log(req.body.donation);
            if (donations.length != 0)
                req.body.donation.id = donations[0].id + 1;
            else
                req.body.donation.id = 1;

            // Insert the new record
            donationDB.insert(req.body.donation, function (err, newDonation) {
                res.status(201);
                res.send(JSON.stringify({donation: newDonation}));
            })
        });
    });

    donationsRouter.get('/:id', function (req, res) {
        donationDB.find({id: req.params.id}).exec(function (error, donations) {
            if (donations.length > 0)
                res.send({
                    'donation': donations[0],
                    'status': true
                });
            else
                res.send({
                    'status': false
                });
        });
    });

    // No changes from here on down
    donationsRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    donationsRouter.put('/:id', function (req, res) {
        res.send({
            'donations': {
                id: req.params.id
            }
        });
    });

    donationsRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/api/donations', donationsRouter);
};
