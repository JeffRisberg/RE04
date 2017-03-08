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
const PATH_JS = path.resolve(__dirname, '../app/js');

const PATH_DIST = path.resolve(__dirname, '../dist');

app.use('/styles', express.static(PATH_STYLES));
app.use('/images', express.static(PATH_IMAGES));
app.use('/js', express.static(PATH_JS));
app.use(express.static(PATH_DIST));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../app/index.html'));
});

var nedb = require('nedb');

app.authTokenDB = new nedb({filename: 'db-content/authTokens', autoload: true});
app.basketItemDB = new nedb({filename: 'db-content/basketItems', autoload: true});
app.categoryDB = new nedb({filename: 'db-content/categories', autoload: true});
app.charityDB = new nedb({filename: 'db-content/charities', autoload: true});
app.donorDB = new nedb({filename: 'db-content/donors', autoload: true});
app.donationDB = new nedb({filename: 'db-content/donations', autoload: true});
app.topCharityDB = new nedb({filename: 'db-content/topCharities', autoload: true});
app.transactionDB = new nedb({filename: 'db-content/transactions', autoload: true});

mocks.forEach(function (route) {
    route(app);
});

app.listen(app.get('port'), function () {
    console.log('Server is listening at %s', app.get('port'));
});
