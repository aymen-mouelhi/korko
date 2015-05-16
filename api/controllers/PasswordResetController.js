/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 11/05/2015.
 */
/**
 * PasswordResetController
 *
 * @module      :: Controller
 * @description    :: A set of functions called `actions`.
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

    /**
     * Create a new password reset token and send
     * an email with instructions to user
     */

    create: function (req, res, next) {
        if (!req.body.email) return res.badRequest({email: "required"});

        User.findOneByEmail(req.body.email, function (err, user) {
            if (err) return res.serverError(err);

            if (!user) return res.badRequest({user: "not found"});

            // Todo: Update Kue
            /*
             Jobs.create('sendPasswordResetEmail', { user: user.toObject() }).save(function (err) {
             if(err) return res.serverError(err);
             res.send({ info: "Password reset instructions sent" });
             });
             */

            // Send User Email
            user.sendPasswordResetEmail(function (error) {
                if (err) return res.serverError(err);
                req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                //res.send({info: 'An e-mail has been sent to ' + user.email + ' with further instructions.'});
                res.redirect('/reset')
            });

        });
    },

    /**
     * Update user password
     * Expects and consumes a password reset token
     */

    update: function (req, res, next) {

        if (!req.params.token) return res.badRequest({token: "required"});

        User.findOne({
            resetPasswordToken: req.params.token
        }, function (err, user) {
            if (err) {
                req.flash('error', err);
                return next(null, false);
            } else {
                if (user) {
                    // Update user with new password
                    Passport.findOne({
                        protocol: 'local'
                        , user: user.id
                    }, function (err, passport) {
                        if (passport) {

                            console.log("Password reset token: " + req.params.token);
                            console.log("Stored Password reset token: " + user.resetPasswordToken);

                            // Check if the token is valid
                            if (!user.resetPasswordToken || user.resetPasswordToken !== req.params.token) {
                                console.log("token invalid");
                                return res.badRequest({token: "invalid"});
                            }

                            // Check if token is expired
                            var expires = new Date().setHours(new Date().getHours() - 2);

                            if (user.resetPasswordExpires <= expires) {
                                console.log("token expired");
                                return res.badRequest({token: "expired"});
                            }


                            // Check if password has been provided
                            if (!req.body.password) {
                                console.log("password not provided");
                                return res.badRequest({password: "required"});
                            }


                            // Check if password matches confirmation
                            if (req.body.password !== req.body.passwordConfirmation) {
                                console.log("password doesn't match");
                                return res.badRequest({passwordConfirmation: "invalid"});
                            }


                            passport.password = req.body.password;

                            passport.save(function (err) {
                                if (err) return res.serverError(err);
                                req.flash('success', 'Password has been updated');
                                // Todo: Send Email to inform user that password has been updated
                                res.redirect('/reset')
                            });
                        }
                        else {
                            req.flash('error', 'Error.Passport.Password.NotSet');
                            return next(null, false);
                        }
                    });
                } else {
                    console.log("User cannot be found");
                    req.flash('error', 'User cannot be found');
                    return next(null, false);
                }
            }



        });

    },

    /**
     * Ceck Password Reset Token
     * @param req
     * @param res
     * @param next
     */
    check: function (req, res, next) {
        // Todo: resetPasswordExpires expires after one hour, check one hour and not gt
        console.log("Token: " + req.params.token);
        console.log("Date: " + Date.now());

        User.findOne({
            resetPasswordToken: req.params.token

        }, function (err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/reset');
            } else {
                if (user.resetPasswordExpires < Date.now()) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('/reset');
                }

                return res.redirect('/update/' + req.params.token);
                /*
                 res.render('reset', {
                 user: req.user
                 });
                 */
            }
        });
    },


    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to PasswordResetController)
     */
    _config: {
        blueprints: {
            rest: false
        }
    }

};