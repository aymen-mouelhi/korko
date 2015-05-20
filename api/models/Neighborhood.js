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

module.exports = {

    attributes: {

        coordinates: {
            type: 'array'
        },

        name: {
            type: 'string',
            defaultsTo: 'My neighborhood'
        },

        location: {
            type: 'json' // lat and lng
        },
        user: {model: 'User', required: true}

    }

};