/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 28/05/2015.
 */
var Thread = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        name: {type: 'string'},
        subject: {type: 'string'},
        message_count: {type: 'int32'},
        unread_count: {type: 'int32'},
        messages: {collection: 'Message', via: 'thread'},
        user: {model: 'User', required: true},
        pin: {model: 'Pin', required: false}
    },

    // Todo: Create method toJSON
    toJSON: function () {
        // Add user info + pin info
    }
};

module.exports = Thread;