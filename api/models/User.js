// Todo: Update User Model from: https://github.com/aymen-mouelhi/sails-starter-app/blob/master/api/models/User.js

var bcrypt = require('bcryptjs'),
    uuid = require("node-uuid"),
    _ = require("lodash");

module.exports = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        //username: {type: 'string', unique: true},
        firstName: {type: 'string'},
        lastName: {type: 'string'},
        email: {type: 'email', unique: true},
        birthday: {type: 'date'},
        resetPasswordToken: {type: 'string'},
        resetPasswordExpires: {type: 'int'},
        sessionTokens: {type: 'array'},
        passports: {collection: 'Passport', via: 'user'},
        neighborhoods: {collection: 'Neighborhood', via: 'user'},


        /**
         * Get user's full name
         */
        fullName: function () {
            console.log("this.firstName: " + this.firstName);

            return _.compact([this.firstName, this.lastName]).join(' ');
        },

        /**
         * Custom toJSON() implementation. Removes unwanted attributes.
         */

        toJSON: function () {
            var user = this.toObject();
            delete user.password;
            delete user.passwordConfirmation;
            //delete user.password;
            delete user.sessionTokens;
            delete user._csrf;
            return user;
        },

        /**
         * Check if the supplied password matches the stored password.
         */

        validatePassword: function (candidatePassword, cb) {
            bcrypt.compare(candidatePassword, this.encryptedPassword, function (err, valid) {
                if (err) return cb(err);
                cb(null, valid);
            });
        },

        /**
         * Generate password reset token
         */

        generatePasswordResetToken: function (cb) {
            this.resetPasswordToken = Token.generate().value;

            // Expires after one hour
            this.resetPasswordExpires = parseInt(Date.now() + 3600000); // 1 hour

            console.log("resetPasswordToken: " + JSON.stringify(this.resetPasswordToken));
            console.log("resetPasswordExpires: " + this.resetPasswordExpires);

            // Save user
            this.save(function (err) {
                if (err) {
                    console.log("Error while saving user: " + JSON.stringify(err));
                    return cb(err);
                }
                cb();
            });

        },

        /**
         * Send password reset email
         *
         * Generate a password reset token and send an email to the user with
         * instructions to reset their password
         */

        sendPasswordResetEmail: function (cb) {
            var self = this;

            this.generatePasswordResetToken(function (err) {
                if (err) return cb(err);

                // Send email
                var email = new Email._model({
                    to: {
                        name: self.fullName(),
                        email: self.email
                    },
                    subject: "Reset your Korko password",
                    data: {
                        resetURL: sails.getBaseurl() + '/reset/' + self.resetPasswordToken
                    },
                    tags: ['password-reset', 'transactional'],
                    template: 'password-reset'
                });

                email.setDefaults();

                email.send(function (err, res, msg) {
                    cb(err, res, msg, self.resetPasswordToken);
                });
            });
        },


        /**
         * Send password update email
         *
         * Inform user that password has been updated
         */

        sendPasswordUpdatedEmail: function (cb) {
            var self = this;

            // Send email
            var email = new Email._model({
                to: {
                    name: self.fullName(),
                    email: self.email
                },
                subject: "Your Korko password has been updated",
                tags: ['password-update', 'transactional'],
                template: 'password-update'
            });

            email.setDefaults();

            email.send(function (err, res, msg) {
                cb(err, res, msg, self.resetPasswordToken);
            });

        },

        /**
         * Functions that run before a user is created
         */
        /*
         beforeCreate: [
         // Encrypt user's password
         function (values, cb) {
         if (!values.password || values.password !== values.passwordConfirmation) {
         return cb({err: "Password doesn't match confirmation!"});
         }

         User.encryptPassword(values, function (err) {
         cb(err);
         });
         },

         // Create an API key
         function (values, cb) {
         values.apiKey = uuid.v4();
         cb();
         }
         ],
         */

        /**
         * Functions that run before a user is updated
         */

        /*
         beforeUpdate: [
         // Encrypt user's password, if changed
         function (values, cb) {
         if (!values.password) {
         return cb();
         }

         User.encryptPassword(values, function (err) {
         cb(err);
         });
         }
         ],
         */

        /**
         * User password encryption. Uses bcrypt.
         */

        encryptPassword: function (values, cb) {
            bcrypt.hash(values.password, 10, function (err, encryptedPassword) {
                if (err) return cb(err);
                values.encryptedPassword = encryptedPassword;
                cb();
            });
        },

        /**
         * Issue a session token for a user
         */

        issueSessionToken: function (user, cb) {
            if (!user || typeof user === 'function') return cb("A user model must be supplied");

            if (!user.sessionTokens) {
                user.sessionTokens = [];
            }

            var token = uuid.v4();

            user.sessionTokens.push({
                token: token,
                issuedAt: new Date()
            });

            user.save(function (err) {
                console.log("error while saving user?");
                cb(err, token);
            });
        },

        /**
         * Consume a user's session token
         */

        consumeSessionToken: function (token, cb) {

            if (!token || typeof token === 'function') return cb("A token must be supplied");

            User.findOne({'sessionTokens.token': token}, function (err, user) {
                if (err) return cb(err);
                if (!user) return cb(null, false);

                // Remove the consumed session token so it can no longer be used
                if (user.sessionTokens) {
                    user.sessionTokens.forEach(function (sessionToken, index) {
                        if (sessionToken.token === token) {
                            delete user.sessionTokens[index];
                        }
                    });
                }

                // Remove falsy tokens
                user.sessionTokens = _.compact(user.sessionTokens);

                // Save
                user.save(function (err) {
                    return cb(err, user);
                });
            });
        }
    }
};
