/**
 * Serves the application to the browser, serves the bundle, registers mock REST handlers
 */
var path = require('path');
var globSync = require('glob').sync;
var express = require('express');
var app = express();

var mocks = globSync('./mocks/**/*.js', {cwd: __dirname}).map(require);

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/', express.static(path.resolve(__dirname, '../dist')));

var nedb = require('nedb');

app.donationDB = new nedb({filename: 'donations', autoload: true});
app.transactionDB = new nedb({filename: 'transactions', autoload: true});

mocks.forEach(function (route) {
    route(app);
});

app.listen(app.get('port'), function () {
    console.log('Server is listening at %s', app.get('port'));
});
