/**
 * Serves the application to the browser, serves the bundle, then handles postings of new comments
 */
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.resolve(__dirname, 'dist')));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** Return a list of charities */
app.get('/charities.json', function (req, res) {
    fs.readFile('charities.json', function (err, data) {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(JSON.parse(data));
    });
});

app.listen(app.get('port'), function () {
    console.log('Server is listening at %s', app.get('port'));
});
