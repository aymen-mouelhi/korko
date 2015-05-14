/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 11/05/2015.
 */
var uuid = require("node-uuid");

module.exports.generate = function() {
    return { value: uuid.v4(), issuedAt: new Date() };
}