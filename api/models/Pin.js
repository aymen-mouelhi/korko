/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 11/05/2015.
 */
var Pin = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        title: {type: 'string'},
        description: {type: 'string'},
        // Todo: Category should be required
        category: {model: 'Category', required: false},
        location: {model: 'Location', required: true},
        user: {model: 'User', required: true},
        images: {type: 'json'}
    }
};

module.exports = Pin;