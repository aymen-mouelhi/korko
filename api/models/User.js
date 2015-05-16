// Todo: Update User Model from: https://github.com/aymen-mouelhi/sails-starter-app/blob/master/api/models/User.js

var bcrypt = require('bcryptjs'),
    uuid = require("node-uuid"),
    _ = require("lodash");

module.exports = {
    // Enforce model schema in the case of schemaless databases
    schema: true,

    attributes: {
        //username: {type: 'string', unique: true},
        first_name: {type: 'string'},
        last_name: {type: 'string'},
        email: {type: 'email', unique: true},
        birthday: {type: 'date'},
        passports: {collection: 'Passport', via: 'user'},
        resetPasswordToken: {type: 'string'},
        resetPasswordExpires: {type: 'Date'},


        /**
         * Get user's full name
         */
        fullName: function () {
            console.log("this.first_name: " + this.first_name);

            return _.compact([this.first_name, this.last_name]).join(' ');
        },

        /**
         * Custom toJSON() implementation. Removes unwanted attributes.
         */

        toJSON: function () {
            var user = this.toObject();
            delete user.password;
            delete user.passwordConfirmation;
            delete user.encryptedPassword;
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
            this.resetPasswordToken = Token.generate();
            cb();
            /*
             this.save(function (err) {
             if (err) return cb(err);
             cb();
             });
             */
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
                        resetURL: sails.getBaseurl() + '/reset/' + self.resetPasswordToken.value
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
