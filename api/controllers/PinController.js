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
        var annotatedPins = [];
        Pin.find()
            .populate('location')
            .populate('user')
            .populate('category')
            .populate('threads')
            .populate('reservations')
            .then(function (pins) {
                async.each(pins, function (pin, callback) {
                    // isMine is needed to know if item belongs to user or not
                    pin.isMine = false;

                    if (pin.user.id === req.user.id) {
                        pin.isMine = true;
                    }

                    annotatedPins.push(pin);

                    callback();
                }, function (err) {
                    return res.json(annotatedPins);
                });

            });
    },

    /**
     * Get User Pins
     * @param req
     * @param res
     */
    getUserPins: function (req, res) {
        var annotatedPins = [];

        var userId = req.params.userId;

        if (userId === "me") {
            userId = req.user.id;
        }

        Pin.find({
            user: userId
        })
            .populate('location')
            .populate('user')
            .populate('category')
            .populate('threads')
            .populate('reservations')
            .then(function (pins) {
                async.each(pins, function (pin, callback) {
                    // isMine is needed to know if item belongs to user or not
                    pin.isMine = false;

                    if (pin.user.id === req.user.id) {
                        pin.isMine = true;
                    }

                    annotatedPins.push(pin);

                    callback();
                }, function (err) {
                    return res.json(annotatedPins);
                });
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
            var price = req.body.price;
            var category = req.body.category;
            var location = JSON.parse(req.body.location);
            var range = "";

            if (price) {
                price = parseFloat(price);
            }


            // Get Range
            if (req.body.range) {
                range = req.body.range;
            }

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
                        category: category,
                        price: price,
                        range: range
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


            req.user.neighborhoods = [];

            Neighborhood.findOne({
                user: req.user.id
            })
                .populate("location")
                .then(function (neighborhood) {
                    if (neighborhood) {
                        console.info("retrived neighborhood: " + JSON.stringify(neighborhood.location));
                        req.user.neighborhoods = neighborhood.location;
                        return res.view();
                    } else {
                        console.info("Neighborhood is not found");
                        return res.view();
                    }
                });

            /*
             return res.view({
             errors: req.flash('error')
             });
             */
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

                if (!err) {
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

                        console.log("Image path: " + req.files.image.path);

                        var path = req.files.image.path;
                        /*
                         path.replace("/.tmp/public", "");
                         path.replace("\\.tmp\\public", "");
                         path.replace('assets', '');
                         */
                        path = path.substring(path.indexOf("uploads"), path.length);

                        console.log("image path: " + path);

                        // Read Uploaded File
                        pin.images.push({
                            name: req.files.image.originalname,
                            path: path,
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
                } else {
                    console.info(err);
                    return res.serverError(err);
                }

            });
        } else {
            // Return view update for given pin
            Pin.findOne({
                id: pinId
            }).populate('location')
                .populate('user')
                .populate('category')
                .populate('threads')
                .populate('reservations')
                .then(function (pin) {
                    if (!pin) {
                        return res.serverError("Pin is not found");
                    }
                    console.log("Pin Location: " + JSON.stringify(pin.location));
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

        // Todo: search via location
        if (!location) {
            console.info('Query: ' + query);
            if (query) {
                this.searchByKeyword(query, function (err, pins) {
                    if (err) {
                        console.info(err);
                        return res.serverError(err);
                    }

                    console.info("Found Pins: " + JSON.stringify(pins));

                    // Return matched pins
                    res.json(pins);
                });
            } else {
                // return all pins
                Pin.find()
                    .populate('location')
                    .populate('user')
                    .populate('category')
                    .populate('threads')
                    .then(function (pins) {
                        return res.json(pins);
                    });
            }

        }
    },


    searchByKeyword: function (query, callback) {
        // Todo: check fix for sails js issue regarding string index: https://github.com/balderdashy/waterline
        //Pin.find({$text: {$search: query}}, callback);

        Pin.find()
            .where({
                or: [
                    {title: {contains: query}},
                    {description: {contains: query}}
                ]

            })
            .populate('location')
            .populate('user')
            .populate('category')
            .populate('threads')
            .exec(function (err, pins) {
                if (err) {
                    callback(err, null);
                }
                callback(null, pins);
            });
    }
};