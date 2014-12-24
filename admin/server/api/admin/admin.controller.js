/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var fs = require('fs');

// Get list of things
exports.upcomingEvents = function(req, res) {

  res.json(
    JSON.parse( fs.readFileSync('../main/client/assets/cms/upcomingEvents.json', 'utf8') )
  );

};

exports.upcomingEventsPost = function(req, res) {

  try {

    var jsonStr = JSON.stringify(req.body);
    fs.writeFileSync('../main/client/assets/cms/upcomingEvents.json', jsonStr, 'utf8');
    res.send(200);

  } catch(err) {
    console.log('Error posting upcomingEvents', err);
    res.send(500, err);
  }


};
