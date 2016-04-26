/**
 * Serves the application to the browser, serves the bundle, registers mock REST handlers
 */
var path = require('path');
var globSync = require('glob').sync;
var express = require('express');
var app = express();

var mocks = globSync('./mocks/**/*.js', {cwd: __dirname}).map(require);

app.set('port', (process.env.PORT || 3000));

const PATH_STYLES = path.resolve(__dirname, '../app/styles');
const PATH_IMAGES = path.resolve(__dirname, '../app/images');
const PATH_DIST = path.resolve(__dirname, '../dist');

app.use('/styles', express.static(PATH_STYLES));
app.use('/images', express.static(PATH_IMAGES));
app.use(express.static(PATH_DIST));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../app/index.html'));
});

var nedb = require('nedb');

app.authTokenDB = new nedb({filename: 'authTokens', autoload: true});
app.basketItemDB = new nedb({filename: 'basketItems', autoload: true});
app.categoryDB = new nedb({filename: 'categories', autoload: true});
app.charityDB = new nedb({filename: 'charities', autoload: true});
app.donorDB = new nedb({filename: 'donors', autoload: true});
app.donationDB = new nedb({filename: 'donations', autoload: true});
app.listCharityDB = new nedb({filename: 'listCharities', autoload: true});
app.transactionDB = new nedb({filename: 'transactions', autoload: true});

mocks.forEach(function (route) {
    route(app);
});

app.listen(app.get('port'), function () {
    console.log('Server is listening at %s', app.get('port'));
});
