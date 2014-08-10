'use strict';

var express = require('express');
var controller = require('./message.controller');

var router = express.Router();

router.post('/sendMessage', controller.sendMessage);

module.exports = router;