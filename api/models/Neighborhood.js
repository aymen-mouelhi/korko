/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 20/05/2015.
 */
/**
 * Email
 *
 * @module      :: Model
 * @description :: This is the email model.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var Neighborhood = {

    attributes: {

        coordinates: {
            type: 'json'
        },

        name: {
            type: 'string',
            defaultsTo: 'My neighborhood'
        },

        type: {
            type: 'string'
        },

        // Center of polygon, can be calculated
        location: {
            type: 'json' // lat and lng
        },
        user: {model: 'User', required: true}

    }

};

module.exports = Neighborhood;