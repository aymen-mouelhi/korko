/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    account: function (req, res) {
        return res.view();
    },

    update: function (req, res) {
        var id = req.params.id;
        console.info("recieved user id: " + id);
        // Get neighborhood

    }
	
};