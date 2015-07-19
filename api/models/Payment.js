/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 28/05/2015.
 */
var Payment = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        amount: {type: 'int32'},
        currency: {type: 'string'},
        user: {model: 'User', required: false},
        pin: {model: 'Pin', required: false}
    }
};

module.exports = Payment;