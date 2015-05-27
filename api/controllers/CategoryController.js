/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 24/05/2015.
 */
/**
 * CategoryController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    get: function (req, res) {
        // Find Category
        Category.findOne({
            id: req.params.id
        }, function (err, category) {
            if (err) {
                console.info(err);
                return res.serverError(err);
            }
            // Send category
            res.json(category);
        });
    },


};