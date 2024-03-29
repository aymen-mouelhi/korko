/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var AuthController = {
    /**
     * Render the login page
     *
     * The login form itself is just a simple HTML form:
     *
     <form role="form" action="/auth/local" method="post">
     <input type="text" name="identifier" placeholder="Username or Email">
     <input type="password" name="password" placeholder="Password">
     <button type="submit">Sign in</button>
     </form>
     *
     * You could optionally add CSRF-protection as outlined in the documentation:
     * http://sailsjs.org/#!documentation/config.csrf
     *
     * A simple example of automatically listing all available providers in a
     * Handlebars template would look like this:
     *
     {{#each providers}}
     <a href="/auth/{{slug}}" role="button">{{name}}</a>
     {{/each}}
     *
     * @param {Object} req
     * @param {Object} res
     */
    login: function (req, res) {
        var strategies = sails.config.passport
            , providers = {};

        // Get a list of available providers for use in your templates.
        Object.keys(strategies).forEach(function (key) {
            if (key === 'local') {
                return;
            }

            providers[key] = {
                name: strategies[key].name
                , slug: key
            };
        });

        // Render the `auth/login.ext` view
        res.view({
            providers: providers
            , errors: req.flash('error')
        });
    },

    /**
     * Log out a user and return them to the homepage
     *
     * Passport exposes a logout() function on req (also aliased as logOut()) that
     * can be called from any route handler which needs to terminate a login
     * session. Invoking logout() will remove the req.user property and clear the
     * login session (if any).
     *
     * For more information on logging out users in Passport.js, check out:
     * http://passportjs.org/guide/logout/
     *
     * @param {Object} req
     * @param {Object} res
     */
    logout: function (req, res) {
        req.logout();

        // mark the user as logged out for auth purposes
        req.session.authenticated = false;

        res.redirect('/');
    },

    /**
     * Render the registration page
     *
     * Just like the login form, the registration form is just simple HTML:
     *
     <form role="form" action="/auth/local/register" method="post">
     <input type="text" name="username" placeholder="Username">
     <input type="text" name="email" placeholder="Email">
     <input type="password" name="password" placeholder="Password">
     <button type="submit">Sign up</button>
     </form>
     *
     * @param {Object} req
     * @param {Object} res
     */
    register: function (req, res) {
        res.view({
            errors: req.flash('error')
        });
    },

    /**
     * Reset Password View
     * @param req
     * @param res
     */
    reset: function (req, res) {
        var messages = {
            error: req.flash('error'),
            info: req.flash('info'),
            success: req.flash('success')
        };

        res.view({
            messages: messages
        });
    },

    /**
     * Update Password
     * @param req
     * @param res
     */
    update: function (req, res) {
        console.log("Token: " + req.params.token);

        res.view({
            errors: req.flash('error'),
            token: req.params.token
        });
    },

    /**
     * Create a third-party authentication endpoint
     *
     * @param {Object} req
     * @param {Object} res
     */
    provider: function (req, res) {
        passport.endpoint(req, res);
    },

    /**
     * Create a authentication callback endpoint
     *
     * This endpoint handles everything related to creating and verifying Pass-
     * ports and users, both locally and from third-aprty providers.
     *
     * Passport exposes a login() function on req (also aliased as logIn()) that
     * can be used to establish a login session. When the login operation
     * completes, user will be assigned to req.user.
     *
     * For more information on logging in users in Passport.js, check out:
     * http://passportjs.org/guide/login/
     *
     * @param {Object} req
     * @param {Object} res
     */
    callback: function (req, res) {
        function tryAgain(err) {

            console.log("Error in callback: " + JSON.stringify(err));

            // Only certain error messages are returned via req.flash('error', someError)
            // because we shouldn't expose internal authorization errors to the user.
            // We do return a generic error and the original request body.
            var flashError = req.flash('error')[0];

            console.log("flashError Error in callback: " + flashError);

            if (err && !flashError) {
                req.flash('error', 'Error.Passport.Generic');
            } else if (flashError) {
                req.flash('error', flashError);
            }
            req.flash('form', req.body);

            // If an error was thrown, redirect the user to the
            // login, register or disconnect action initiator view.
            // These views should take care of rendering the error messages.
            var action = req.param('action');

            switch (action) {
                case 'register':
                    res.redirect('/register');
                    break;
                case 'disconnect':
                    res.redirect('back');
                    break;
                default:
                    res.redirect('/login');
            }
        }

        passport.callback(req, res, function (err, user, challenges, statuses) {

            if (err || !user) {
                return tryAgain(challenges);
            }


            // Log the user in
            req.login(user, function (err) {
                if (err) return tryAgain(err);


                // Mark the session as authenticated to work with default Sails sessionAuth.js policy
                req.session.authenticated = true;

                // Make user available to the frontend
                req.user = user.toJSON();

                // find neighborhhods of user

                req.user.neighborhoods = [];
                
                Neighborhood.findOne({
                    user: user.id
                })
                    .populate("location")
                    .then(function (neighborhood) {
                        if (neighborhood) {
                            console.info("retrived neighborhood: " + JSON.stringify(neighborhood.location));
                            req.user.neighborhoods = neighborhood.location;
                            //return res.view();
                            res.redirect('/');
                            return;
                        } else {
                            console.info("Neighborhood is not found");
                            //return res.view();
                            res.redirect('/');
                        }
                    });


                console.info("Req.user: " + JSON.stringify(req.user));

                // Just return user JSON if remember me was not specified
                if (!req.body.remember) {
                    res.redirect('/');
                } else {
                    // If remember me option was specified, issue a session token
                    user.issueSessionToken(user, function (err, token) {
                        if (err) {
                            return res.serverError(err);
                        }

                        // Create Cookie
                        res.cookie('remember_me', token, {path: '/', httpOnly: true, maxAge: 60 * 60 * 24 * 30});
                        // ... and return user data as JSON

                        res.redirect('/');
                        //res.send(user.toJSON());
                    });
                }

            });


            /*
             req.login(user, function (err) {
             if (err) {
             return tryAgain(err);
             }
             console.info("Authenticated user: " + user);
             console.info("Authenticated user: " + JSON.stringify(user));
             // Todo: Store returned user info (image / email)


             // Todo: Create Session cookie

             // Upon successful login, send the user to the homepage were req.user
             // will be available.
             res.redirect('/dashboard/app');
             });
             */
        });
    },

    /**
     * Disconnect a passport from a user
     *
     * @param {Object} req
     * @param {Object} res
     */
    disconnect: function (req, res) {
        passport.disconnect(req, res);
    }
};

module.exports = AuthController;
