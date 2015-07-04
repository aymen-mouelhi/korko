/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 11/05/2015.
 */
/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboard
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    app : function(req, res) {
        return res.view({layout: null});
    },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to DashboardController)
     */
    _config: {}

};