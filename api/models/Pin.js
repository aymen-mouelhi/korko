/**
 * Created by I060307 on 11/05/2015.
 */
var User = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        name: {type: 'string', unique: true},
        last_name: {type: 'string'},
        email: {type: 'email', unique: true}
    }
};

module.exports = User;