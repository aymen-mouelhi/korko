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
        console.info("recieved user id: " + req.params.id);

        // Get neighborhood
        var neighborhoods = JSON.parse(req.body.neighborhood);

        console.info("recieved neighborhoods: " + req.body.neighborhood);

        User.findOne({
            id: req.params.id
        }, function (err, user) {

            if (err) return res.serverError(err);

            user.neighborhoods.push(neighborhoods);

            user.save(function () {
                if (err) return res.serverError(err);
                req.flash('success', 'Neighborhood saved');
                return res.ok();
            });
        });

    }
	
};