
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var app = express();

app.set('port', (process.env.PORT || 3000));
// app.use('/', express.static(path.join(__dirname, 'public/index.html')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//serves the static resources from public
app.use(express.static(__dirname + '/public'));

app.post('/api/inputPassword', function(req, res) {
  var SALT_WORK_FACTOR = req.body.SALT_WORK_FACTOR || 12;
  var inputPassword = req.body.inputPassword;
  var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  var hash = bcrypt.hashSync(inputPassword, salt);
  res.status(200).json({hash: hash});
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
