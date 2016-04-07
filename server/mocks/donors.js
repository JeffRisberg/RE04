module.exports = function (app) {
    var express = require('express');
    var donorsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    donorsRouter.use(bodyParser.json());

    var authTokenDB = app.authTokenDB;
    var donorDB = app.donorDB;
    var transactionDB = app.transactionDB;

    function generateUUID() {
        var d = new Date().getTime();

        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    donorsRouter.get('/', function (req, res) {
        delete req.query["_"];
        donorDB.find(req.query).exec(function (error, donors) {
            res.send({
                'data': donors
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
            var token = generateUUID();

            if (donors.length != 0) {
                var donorId = donors[0].id;

                transactionDB.find({}).sort({id: -1}).limit(1).exec(function (err, transactions) {
                    var newTransactionId = 1;

                    if (transactions.length != 0) {
                        newTransactionId = parseInt(transactions[0].id) + 1;
                    }

                    var newTransaction = {id: newTransactionId, donorId: donorId};
                    // Insert the new record
                    transactionDB.insert(newTransaction, function (err, newTransaction) {

                        var newAuthToken = {token: token, donorId: donorId, orderId: newTransactionId};

                        authTokenDB.insert(newAuthToken, function (err, result) {
                            res.status(201);
                            res.send(JSON.stringify({data: newAuthToken}));
                        });
                    });
                });
            } else {
                res.status(404);
                res.send(JSON.stringify({data: null}));
            }
        })
    });

    donorsRouter.post('/logout', function (req, res) {
        // to be filled in
    });

    donorsRouter.get('/:id', function (req, res) {
        donorDB.find({id: req.params.id}).exec(function (error, donors) {
            if (donors.length > 0)
                res.send({
                    'data': donors[0]
                });
            else {
                req.status(404);
                res.send({
                    'data': null
                });
            }
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
