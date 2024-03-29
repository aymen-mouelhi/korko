/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 28/05/2015.
 */
var Reservation = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        from: {type: 'string'},
        to: {type: 'string'},
        range: {type: 'string'},
        accepted: {type: 'boolean'},
        //payment: {model: 'Payment', required: false},
        user: {model: 'User', required: true},
        pin: {model: 'Pin', required: true}
    }
};

module.exports = Reservation;