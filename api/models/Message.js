/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 28/05/2015.
 */
var Message = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        text: {type: 'string'},
        thread: {model: 'Thread', required: true},
        // Todo: Check this relation
        author: {model: 'User', required: true}
    }
};

module.exports = Message;