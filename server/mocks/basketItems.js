module.exports = function (app) {
    var express = require('express');
    var basketRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    basketRouter.use(bodyParser.json());

    var basketItemDB = app.basketItemDB;
    var charityDB = app.charityDB;

    basketRouter.get('/', function (req, res) {
        delete req.query["_"];
        basketItemDB.find(req.query).exec(function (error, donations) {
            res.send({
                'data': donations
            })
        })
    });

    basketRouter.post('/donations/:ein', function (req, res) {
        charityDB.find({ein: req.params.ein}).exec(function (error, charities) {
            if (charities.length > 0)

                // Look for the most recently created record
                basketItemDB.find({}).sort({id: -1}).limit(1).exec(function (err, donations) {

                    req.body.charityId = charities[0].id;
                    console.log(req.body);
                    if (donations.length != 0)
                        req.body.id = donations[0].id + 1;
                    else
                        req.body.id = 1;

                    // Insert the new record
                    donationDB.insert(req.body, function (err, newDonation) {
                        res.status(201);
                        res.send(JSON.stringify({donation: newDonation}));
                    })
                });
        });
    });

    app.use('/ws/basket', basketRouter);
};
