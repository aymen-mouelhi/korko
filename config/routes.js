/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/
    /*
    '/': {
     view: 'home/home'
    },
     */

    //'get /': 'HomeController.home',
    'get /': 'PinController.pin',


    /*
    '/home': {
        view: 'dashboard/app'
    },
     */

    '/map': {
        view: '/map/app'
    },

    '/air': {
        view: 'airbnb'
    },

    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     *  If a request to a URL doesn't match any of the custom routes above, it  *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/

    'get /login': 'AuthController.login',
    'get /logout': 'AuthController.logout',
    'get /register': 'AuthController.register',
    'get /reset': 'AuthController.reset',
    'get /update/:token': 'AuthController.update',

    'post /auth/local': 'AuthController.callback',
    'post /auth/local/:action': 'AuthController.callback',

    'get /auth/:provider': 'AuthController.provider',
    'get /auth/:provider/callback': 'AuthController.callback',

    'post /reset': 'PasswordReset.create',

    'post /user/:id': 'UserController.update',
    'get /reset/:token': 'PasswordReset.check',
    'post /reset/:token': 'PasswordReset.update',


    'get /pins': 'PinController.json',

    'get /pin': 'PinController.get',
    'get /pin/pin': 'PinController.pin',
    'post /pin/create': 'PinController.create',
    'get /pin/create': 'PinController.create',
    'post /pin/:id': 'PinController.update',
    'get /pin/:id': 'PinController.update',

    'get /search/:query': 'PinController.search',


    'get /notification': 'NotificationController.get',

    'get /location/:id': 'LocationController.get',
    'get /category/:id': 'CategoryController.get',


    'get /config': 'ConfigController.display'
};
