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
        basketItemDB.find(req.query).exec(function (error, basketItems) {
            res.send({
                'data': {donations: basketItems}
            })
        })
    });

    basketRouter.post('/donations/:ein', function (req, res) {
        charityDB.find({ein: req.params.ein}).exec(function (error, charities) {
            if (charities.length > 0)

                // Look for the most recently created record
                basketItemDB.find({}).sort({id: -1}).limit(1).exec(function (err, basketItems) {

                    req.body.charity = charities[0];
                    req.body.charityId = charities[0].id;

                    if (basketItems.length != 0)
                        req.body.id = basketItems[0].id + 1;
                    else
                        req.body.id = 1;

                    // Insert the new record
                    basketItemDB.insert(req.body, function (err, newBasketItem) {
                        res.status(201);
                        res.send(JSON.stringify({donation: newBasketItem}));
                    })
                });
        });
    });

    app.use('/ws/basket', basketRouter);
};
