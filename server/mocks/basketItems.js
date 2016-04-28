module.exports = function (app) {
    var express = require('express');
    var basketRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    basketRouter.use(bodyParser.json());

    var basketItemDB = app.basketItemDB;
    var donationDB = app.donationDB;

    basketRouter.get('/', function (req, res) {
        delete req.query["_"];
        basketItemDB.find(req.query).exec(function (error, donations) {
            res.send({
                'data': donations
            })
        })
    });

    basketRouter.post('/donate', function (req, res) {
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

    app.use('/ws/basket', basketRouter);
};
