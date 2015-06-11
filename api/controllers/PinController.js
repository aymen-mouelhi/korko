/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 11/05/2015.
 */
/**
 * PinController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var async = require("async");


module.exports = {

    get: function (req, res) {
        var pinArray = [];
        Pin.find()
            .populate('location')
            .populate('user')
            .populate('category')
            .populate('threads')
            .then(function (pins) {

                return res.json(pins);

            });
    },

    // Todo: this should be the dashboard => update method name
    pin: function (req, res) {
        return res.view({
            errors: req.flash('error')
        });
    },

    create: function (req, res) {
        console.info("in PinController Create !");
        if (req.method == "POST") {
            console.log("location: " + req.body.location);
            console.log("User Id: " + req.user.id);

            var title = req.body.title;
            var description = req.body.description;
            var category = req.body.category;
            var location = JSON.parse(req.body.location);

            // Check if user exists
            User.findOne({
                id: req.user.id
            }, function (err, user) {
                if (err) return res.serverError(err);

                // Check Category
                Category.findOne({
                    id: category
                }, function (err, category) {
                    if (err) return res.serverError(err);

                    Pin.create({
                        location: location,
                        user: req.user.id,
                        title: title,
                        description: description,
                        category: category
                    }, function (err, pin) {
                        if (err) {
                            console.info(err);
                            return res.serverError(err);
                        }
                        console.info("Pin saved: " + JSON.stringify(pin));

                        req.flash('success', 'Pin saved');
                        //return res.ok();
                        return res.json({id: pin.id})

                    });

                });
            });

        } else {
            return res.view({
                errors: req.flash('error')
            });
        }
    },

    /**
     * Update a Pin
     * @param req
     * @param res
     */

    update: function (req, res) {
        // Update an existing Pin
        var pinId = req.params.id;
        var files = req.files;
        var title = req.body.title;
        var description = req.body.description;
        var category = req.body.category;
        var location;
        if (req.body.location) {
            location = JSON.parse(req.body.location);
        }


        console.log("received Images: " + JSON.stringify(files));
        console.log("received Body: " + JSON.stringify(req.body));


        if (req.method == "POST") {
            // Todo: always check user, is it the owner of the pin
            // Update Pin
            // Find Pin
            Pin.findOne({
                id: pinId
            }, function (err, pin) {

                console.info("Found pin:" + JSON.stringify(pin));

                // Title
                if (title) {
                    pin.title = title;
                }
                // description
                if (description) {
                    pin.description = description;
                }

                // category
                if (category) {
                    pin.category = category;
                }

                // Todo: fix location issue when type: Circle
                // location
                if (location) {
                    pin.location = location;
                }

                // Images
                if (files) {
                    if (!pin.images) {
                        pin.images = [];
                    }
                    // Read Uploaded File
                    pin.images.push({
                        name: req.files.image.originalname,
                        path: req.files.image.path.replace('assets', ''),
                        mimetype: req.files.image.mimetype
                    });
                }

                // save pin
                pin.save(function (err) {
                    if (err) {
                        console.info(err);
                        return res.serverError(err);
                    }
                    return res.json({id: pin.id})
                });

            });
        } else {
            // Return view update for given pin
            Pin.findOne({
                id: pinId
            }, function (err, pin) {
                if (err) {
                    console.info(err);
                    return res.serverError(err);
                }
                // Todo: allow update only if pin owner, otherwize show other details: messaging ..
                // Todo; Node Roles / Authorizations !
                // Todo: pin toJson (to remove extra fields)
                return res.view({
                    pin: JSON.stringify(pin),
                    errors: req.flash('error')
                });
            });
        }
    },


    search: function (req, res) {

        var query = req.params.query;
        var location = req.body.location;


        if (!location) {
            console.info('Query: ' + query);
            this.searchByKeyword(query, function (err, pins) {
                if (err) {
                    console.info(err);
                    return res.serverError(err);
                }

                console.info("Found Pins: " + JSON.stringify(pins));

                // Return matched pins
                res.json(pins);
            });
        }
    },


    searchByKeyword: function (query, callback) {
        // Todo: check fix for sails js issue regarding string index: https://github.com/balderdashy/waterline
        Pin.find({$text: {$search: query}}, callback);
    }
};