module.exports = function (app) {
    const express = require('express');
    const donationsRouter = express.Router();

    // Use the body-parser library in this service
    const bodyParser = require('body-parser');
    donationsRouter.use(bodyParser.json());

    const donationDB = app.donationDB;

    donationsRouter.get('/', function (req, res) {
        delete req.query["_"];
        donationDB.find(req.query).exec(function (error, donations) {
            res.send({
                'status': "ok",
                'data': donations
            })
        })
    });

    donationsRouter.post('/', function (req, res) {
        // Look for the most recently created record
        donationDB.find({}).sort({id: -1}).limit(1).exec(function (err, donations) {

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
                    'status': "ok",
                    'data': donations[0]
                });
            else {
                res.send({
                    'data': null
                });
            }
        });
    });

    // No changes from here on down
    donationsRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    donationsRouter.put('/:id', function (req, res) {
        res.send({
            'status': "ok",
            'donations': {
                id: req.params.id
            }
        });
    });

    donationsRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/ws/donations', donationsRouter);
};
