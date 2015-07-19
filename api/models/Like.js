/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 28/05/2015.
 */
var Like = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        user: {model: 'User', required: true},
        pin: {model: 'Pin', required: false}
    }
};

module.exports = Like;