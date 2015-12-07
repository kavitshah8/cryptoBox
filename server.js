
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var compression = require('compression');
var app = express();

var appConfig, config, oneYear;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
appConfig = require('./config');
config = appConfig[process.env.NODE_ENV];

app.set('port', (process.env.PORT || config.PORT));

// gzip the static resources before seding to browser. In the response header Content-Encoding:gzip
// More details : http://blog.modulus.io/nodejs-and-express-static-content
app.use(compression());

// request is in raw text format. bodyParser converts the raw text in JSON format, which is available on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//serves the static resources from public. Caches the static files for a year.
oneYear = 1 * 365 * 24 * 60 * 60 * 1000;
// app.get('', express.static(, {maxAge: oneYear}));
app.use('/', express.static(__dirname + '/public/', {maxAge: oneYear}));

app.get('/tools/bcrypt-encrypt-verify/', function (req, res, next) {
  res.sendFile(__dirname + '/public/tools/bcrypt-encrypt-verify.html', function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:');
    }
  });

});

// Routes
app.post('/api/inputPassword', function(req, res) {
  var SALT_WORK_FACTOR = req.body.SALT_WORK_FACTOR || 12;
  var inputPassword = req.body.inputPassword;
  var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  var hash = bcrypt.hashSync(inputPassword, salt);
  res.status(200).json({hash: hash});
});

app.post('/api/hashedPassword', function(req, res) {
  var inputPassword = req.body.inputPassword;
  var hashedPassword = req.body.hashedPassword;
  var verified = bcrypt.compareSync(inputPassword, hashedPassword);
  res.status(200).json({verified: verified});
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
