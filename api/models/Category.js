/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 24/05/2015.
 */
var Category = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        title: {type: 'string', unique: true},
        description: {type: 'string'},
        image: {type: 'string'}
    }
};

module.exports = Category;