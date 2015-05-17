/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 17/05/2015.
 */
/**
 * HomeController
 *
 * @description :: Server-side logic for managing dashboard
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    home: function (req, res) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            return res.view('dashboard/app');
        }
        console.log("user is not authenticated");
        return res.view({});
    },

    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to HomeController)
     */
    _config: {}

};