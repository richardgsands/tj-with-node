'use strict';

var _ = require('lodash');
var nodemailer = require("nodemailer");
var EmailSettings = JSON.parse( require('fs').readFileSync('/devconfig/tj-with-node/tj-gmail-settings.json', { encoding: 'utf8' }) );
console.log(EmailSettings);

// Create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport( EmailSettings.nodemailerTransport );
console.log('Transport created - messages going to ' + EmailSettings.emailToAddress);

// Get list of messages
exports.sendMessage = function(req, res) {

    console.log("Send message");
    console.log(req.body);

    if (!req.body.name || !req.body.email || !req.body.message) {
        res.send(403);
        return;
    }

    // Send mail
    sendEmail(req.body.name, req.body.email, req.body.message, function(err) {
        if (err) {
            res.send(500, err);
        } else {
            res.send(200);
        }
    });
    /*
    mail({
        from: req.body.name + "<" + req.body.email + ">", // sender address
        to: "richardgsands@gmail.com", // list of receivers
        subject: "Message from tracyjames.co.uk", // Subject line
        text: req.body.message // plaintext body
    });
    */


};

function sendEmail(name, email, message, cb) {
    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: name + "<" + email + ">", // sender address
        to: EmailSettings.emailToAddress, // list of receivers
        subject: "Message from tracyjames.co.uk", // Subject line
        text: message // plaintext body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            cb(error);
        }else{
            console.log('Message sent: ' + info.response);
            cb();
        }
    });
}