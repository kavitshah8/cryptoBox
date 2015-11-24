
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var app = express();

app.set('port', (process.env.PORT || 3000));

// request is in raw text format. bodyParser converts the raw text in JSON format, which is available on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//serves the static resources from public
app.use('/tools/bcrypt-encrypt-verify/', express.static(__dirname + '/public'));

app.post('/tools/bcrypt-encrypt-verify/api/inputPassword', function(req, res) {
  var SALT_WORK_FACTOR = req.body.SALT_WORK_FACTOR || 12;
  var inputPassword = req.body.inputPassword;
  var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  var hash = bcrypt.hashSync(inputPassword, salt);
  res.status(200).json({hash: hash});
});

app.post('/tools/bcrypt-encrypt-verify/hashedPassword', function(req, res) {
  var inputPassword = req.body.inputPassword;
  var hashedPassword = req.body.hashedPassword;
  var verified = bcrypt.compareSync(inputPassword, hashedPassword);
  res.status(200).json({verified: verified});
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
