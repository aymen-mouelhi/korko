/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var async = require('async');

module.exports.bootstrap = function (cb) {

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    // Todo: Bootstrap Kue and node mailer


    sails.services.passport.loadStrategies();

    // Async Bootrapping

    async.series([

        /**
         * Setup the emailTemplate (Mailer.template) service
         */

            function (cb) {
            require("email-templates")(sails.config.paths.views + '/email', function (err, template) {
                if (err) sails.log.warn(err);

                Mailer.template = template;
                cb();
            });
        },

        /**
         * Setup Kue
         */

            function (cb) {
            var kue = require('kue');


            // Override default createClient function to allow
            // config options for redis client
            var redis = require('../node_modules/kue/node_modules/redis');

            kue.redis.createClient = function () {
                var options = sails.config.redis;

                // Extract options from Redis URL
                if (sails.config.redis.url) {
                    var redisUri = url.parse(sails.config.redis.url);
                    options = {
                        host: redisUri.hostname,
                        port: redisUri.port,
                        pass: redisUri.auth.split(':')[1]
                    };
                }

                var client = redis.createClient(options.port, options.host, options);

                // Log client errors
                client.on("error", function (err) {
                    sails.log.error(err);
                });

                // Authenticate, if required
                if (options.pass) {
                    client.auth(options.pass, function (err) {
                        if (err) sails.log.error(err);
                    });
                }

                return client;
            };


            // Create job queue on Jobs service
            var processors = Jobs._processors;
            Jobs = kue.createQueue();
            Jobs._processors = processors;

            cb();
        }

    ], function () {

        // All bootstrapping is finished

        // If this is a worker instance, execute startWorker
        // callback to skip starting the server
        if (sails.config.worker) {
            return startWorker();
        }

        cb();

    });


};
