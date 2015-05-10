var User = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        //username: {type: 'string', unique: true},
        first_name: {type: 'string'},
        last_name: {type: 'string'},
        email: {type: 'email', unique: true},
        birthday: {type: 'date'},
        passports: {collection: 'Passport', via: 'user'}
    }
};

module.exports = User;
