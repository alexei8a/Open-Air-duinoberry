var emailConfig = require('../../config/application.json')['email'];
var request = require('request');
var nodemailer = require('nodemailer');

module.exports = {
	send: function(text, email, subject) {

		var transporter = nodemailer.createTransport('smtps://' + emailConfig['login'].replace('@', '%40') + ':' + emailConfig['password'] + '@' + emailConfig['smtp'] + '');

		var sender = function (text, email, subject) {

			var mailOptions = {
				from: emailConfig['login'],
				to: email,
				subject: subject ? subject : 'Message',
				text: text,
				html: text
			};

			transporter.sendMail(mailOptions, function(error, info){
				if (error){
					console.log('--> EMAIL SENDING: ', error);
					return false;
				}

				console.log('--> EMAIL SENDING: ', info.response);
			});

		};

		sender(text, email, subject);
	}
};