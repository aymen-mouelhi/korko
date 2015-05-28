/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 11/05/2015.
 */
var Pin = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        title: {type: 'string'},
        description: {type: 'string'},
        category: {model: 'Category', required: true},
        location: {model: 'Location', required: true},
        user: {model: 'User', required: true},
        images: {type: 'json'},
        threads: {collection: 'Thread', via: 'pin'}
    },


    toJSON: function () {

    }
};

module.exports = Pin;