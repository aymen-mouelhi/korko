/**
 * Created by I060307 on 11/05/2015.
 */
var uuid = require("node-uuid");

module.exports.generate = function() {
    return { value: uuid.v4(), issuedAt: new Date() };
}