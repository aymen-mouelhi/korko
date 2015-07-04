/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 11/05/2015.
 */
/**
 * Node Mailer service and setup
 */

var sails = require("sails");
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = nodemailer.createTransport(smtpTransport({
    host: sails.config.smtp.host,
    port: sails.config.smtp.port,
    auth: {
        user: sails.config.smtp.user,
        pass: sails.config.smtp.pass
    }
}));