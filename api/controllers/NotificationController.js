/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 28/05/2015.
 */
/**
 * NotificationController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var async = require("async");

module.exports = {

    get: function (req, res) {


        Notification.find({
            recipient: req.user.id,
            read: false
        })
            .populate('sender')
            .then(function (notifications) {
                return res.json(notifications);
            });

        /*
         var Notifications = [];

         Notification.find({
         recipient: req.user.id
         }, function (err, notifications) {
         if (err) {
         console.info(err);
         return res.serverError(err);
         }


         async.eachSeries(notifications, function (notification, callback) {
         // Get User Information
         User.findOne({
         id: notification.sender
         }, function (err, user) {
         if (err) {
         console.info(err);
         return res.serverError(err);
         }

         // Update User
         notification.sender = user;

         // Push to pins array
         Notifications.push(notification);

         callback();

         });

         }, function (err) {
         if (err) {
         // One of the iterations produced an error.
         // All processing will now stop.
         return res.serverError(err);
         } else {
         return res.json(Notifications);
         }
         });

         });
         */
    },

    update: function (req, res) {

        Notification.findOne({
            id: req.params.id
        }, function (err, notification) {
            if (!err) {
                notification.read = true;

                notification.save(function (err, data) {
                    if (!err) {
                        res.json({status: "ok"});
                    } else {
                        return res.serverError(err);
                    }
                });
            } else {
                return res.serverError(err);
            }
        });

    }
};