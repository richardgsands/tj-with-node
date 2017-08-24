/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var BasicAuth = require('basic-auth');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);


var basicAuth = function(username, password) {
  return function(req, res, next) {
    var user = BasicAuth(req);

    if (!user || user.name !== username || user.pass !== password) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.send(401);
    }

    next();
  };
};

app.use( basicAuth( require('./settings.json').adminUser, require('./settings.json').adminPass ) );


require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
