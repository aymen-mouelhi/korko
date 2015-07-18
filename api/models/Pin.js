/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 11/05/2015.
 */
var Pin = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        title: {
            type: 'string',
            index: true
        },
        description: {
            type: 'string',
            index: true
        },
        range: {type: 'string'},
        price: {type: 'string'},
        status: {type: 'string'},
        category: {model: 'Category', required: true},
        location: {model: 'Location', required: true},
        user: {model: 'User', required: true},
        images: {type: 'json'},
        threads: {collection: 'Thread', via: 'pin'}
    },


    toJSON: function () {

    }
};
/*
// Create index for Pin Collection
Pin.index({ title: 'text', description: 'text'});
*/

module.exports = Pin;