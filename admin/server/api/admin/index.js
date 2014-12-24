'use strict';

var express = require('express');
var controller = require('./admin.controller');

var router = express.Router();

router.get('/upcomingEvents', controller.upcomingEvents);
router.post('/upcomingEvents', controller.upcomingEventsPost);

module.exports = router;
