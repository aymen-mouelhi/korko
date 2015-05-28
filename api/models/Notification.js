/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 28/05/2015.
 */
var Notification = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        title: {type: 'string'},
        body: {type: 'string'},
        icon: {type: 'string'},
        // Todo: Check this relation
        sender: {model: 'User', required: true},
        recipient: {model: 'User', required: true},
        read: {type: 'boolean'}
    },

    push: function () {
        // Push notification to devices?
        // Todo: it should be done just after save?
    }
};

module.exports = Notification;