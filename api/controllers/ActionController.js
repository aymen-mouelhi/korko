/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 06/05/2015.
 */
/**
 * LocationController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {


    like: function (req, res) {
        console.log("Actions Controller: like");
        var pinId = req.params.id;
        res.json({status: "ok"});
    },

    comment: function (req, res) {
        console.log("Actions Controller: comment");
        var pinId = req.params.id;
        res.json({status: "ok"});
    },

    reserve: function (req, res) {
        console.log("Actions Controller: reserve");

        console.log("Received data: " + req.body.range);

        var pinId = req.params.id;

        Pin.findOne({
            id: pinId
        }).populate('user')
            .then(function (pin) {
                if (pin) {

                    var reservation = {
                        accepted: false,
                        range: req.body.range,
                        user: req.user.id,
                        pin: pinId
                    };

                    if (!pin.reservations) {
                        pin.reservations = [];
                    }

                    // Add reservation
                    Reservation.create({
                        accepted: false,
                        range: req.body.range,
                        user: req.user.id,
                        pin: pinId
                    }, function (err, reservation) {
                        if (err) {
                            console.info(err);
                            return res.serverError(err);
                        } else {
                            console.log("Reservation saved: " + JSON.stringify(reservation));

                            // add reservation
                            pin.reservations.push(reservation);

                            if (pin.status != "RESERVED") {
                                // Update status
                                pin.status = "RESERVED";

                                console.log("Trying to add new reservation");

                                // Save Pin
                                pin.save(function (err, data) {
                                    if (err) {
                                        console.info(err);
                                        return res.serverError(err);
                                    } else {

                                        var message = "<a href='/martin'>" + req.user.firstName + " " + req.user.lastName + "</a> has booked <a href='/pin/" + pinId + "'> " + pin.title + "</a><a href='/reserve/?id=" + reservation.id + " &action=accept'>Accept</a><a href='/reserve/?id=" + reservation.id + " &action=cancel'>Cancel</a>";

                                        // Send notification to pin owner
                                        Notification.create({
                                            body: message,
                                            sender: req.user.id,
                                            recipient: pin.user.id,
                                            read: false
                                        }, function (err, notification) {
                                            // Todo: Push Notification in realtime (socket.io)
                                            if (!err) {
                                                console.info("Pin saved: " + JSON.stringify(pin));
                                                req.flash('success', 'Pin saved');
                                                //return res.ok();
                                                return res.json({id: pin.id})
                                            }
                                        });
                                    }
                                });
                            } else {
                                // Pin is alredy reserved by somebody
                                return res.status(200).send("Pin is already reserved");
                            }
                        }
                    });
                } else {
                    return res.serverError("Pin cannot be found");
                }
            });

    },


    confirmReserve: function(req, res){
        var action = req.query.action;

        Reservation.findOne({
            id: req.params.id
        }, function(err, reservation){
                if (err) {
                    console.info(err);
                    return res.serverError(err);
                } else {

                    if(action === "accept"){
                        reservation.accepted = true;
                        reservation.save(function(err, data){
                            return res.status(200).send("Reservation is accepted");
                        });
                    }else{
                        return res.status(200).send("reservation is cancelled");
                    }
                }

        });
    },

    remove: function (req, res) {
        console.log("Actions Controller: remove");
        var pinId = req.params.id;
        res.json({status: "ok"});
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to LocationController)
     */
    _config: {}


};
