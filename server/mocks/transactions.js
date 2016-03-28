module.exports = function (app) {
    var express = require('express');
    var transactionsRouter = express.Router();

    // Use the body-parser library in this service
    var bodyParser = require('body-parser');
    transactionsRouter.use(bodyParser.json());

    // Create an embedded table using NEDB if it doesn't exist yet
    var nedb = require('nedb');
    var transactionDB = app.transactionDB;
    var donationDB = app.donationDB;

    transactionsRouter.get('/', function (req, res) {
        delete req.query["_"];
        transactionDB.find(req.query).exec(function (error, transactions) {
            res.send({
                'transactions': transactions
            })
        })
    });

    transactionsRouter.get('/:id/donations', function (req, res) {
        donationDB.find({transactionId: req.params.id}).exec(function (error, donations) {
            res.send({
                'donations': donations
            })
        });
    });

    transactionsRouter.post('/', function (req, res) {
        // Look for the most recently created record
        transactionDB.find({}).sort({id: -1}).limit(1).exec(function (err, transactions) {

            console.log(req.body.transaction);
            if (transactions.length != 0)
                req.body.transaction.id = transactions[0].id + 1;
            else
                req.body.transaction.id = 1;

            // Insert the new record
            transactionDB.insert(req.body.transaction, function (err, newTransaction) {
                res.status(201);
                res.send(JSON.stringify({transaction: newTransaction}));
            })
        });
    });

    transactionsRouter.get('/:id', function (req, res) {
        transactionDB.find({id: req.params.id}).exec(function (error, transactions) {
            if (transactions.length > 0)
                res.send({
                    'transaction': transactions[0],
                    'status': true
                });
            else
                res.send({
                    'status': false
                });
        });
    });

    // No changes from here on down
    transactionsRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    transactionsRouter.put('/:id', function (req, res) {
        res.send({
            'transactions': {
                id: req.params.id
            }
        });
    });

    transactionsRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/api/transactions', transactionsRouter);
};
