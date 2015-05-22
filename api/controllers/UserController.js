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

        // Get neighborhood
        var neighborhood = JSON.parse(req.body.neighborhood);

        // Check if user exists
        User.findOne({
            id: req.params.id
        }, function (err, user) {
            if (err) return res.serverError(err);

            var coordinates = neighborhood.coordinates;
            var type = neighborhood.type;

            Neighborhood.create({
                coordinates: coordinates,
                user: req.params.id,
                type: type
            }, function (err, neighborhood) {
                if (err) {
                    console.info(err);
                    return res.serverError(err);
                }
                console.info("user saved? " + JSON.stringify(neighborhood));

                req.flash('success', 'Neighborhood saved');
                return res.ok();

            });
        });
    }
};