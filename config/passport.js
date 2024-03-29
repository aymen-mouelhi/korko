/**
 * Passport configuration
 *
 * This is the configuration for your Passport.js setup and where you
 * define the authentication strategies you want your application to employ.
 *
 * I have tested the service with all of the providers listed below - if you
 * come across a provider that for some reason doesn't work, feel free to open
 * an issue on GitHub.
 *
 * Also, authentication scopes can be set through the `scope` property.
 *
 * For more information on the available providers, check out:
 * http://passportjs.org/guide/providers/
 */

module.exports.passport = {
    local: {
        strategy: require('passport-local').Strategy
    },

    rememberMe: {
        strategy: require('passport-remember-me').Strategy
    },

    bearer: {
        strategy: require('passport-http-bearer').Strategy
    },

    twitter: {
        name: 'Twitter',
        protocol: 'oauth',
        strategy: require('passport-twitter').Strategy,
        options: {
            consumerKey: 'Q7mA6Cfa8Z4MlDQOlZgbaqCR5',
            consumerSecret: 'y6EdJy3CNyjOF1jdOh0iwBjjIsgTixnxnjpc12yPi43A0H8BCL',
            callbackURL: "/auth/twitter/callback"
        }
    },

    github: {
        name: 'GitHub',
        protocol: 'oauth2',
        strategy: require('passport-github').Strategy,
        options: {
            clientID: 'your-client-id',
            clientSecret: 'your-client-secret'
        }
    },

    facebook: {
        name: 'Facebook',
        protocol: 'oauth2',
        strategy: require('passport-facebook').Strategy,
        options: {
            clientID: '1584305115150848',
            clientSecret: '1bdb1ac3b27d8a24997c3a3673821e7f',
            scope: ['email', 'user_birthday', 'user_likes', 'user_education_history', 'user_hometown', 'user_location', 'user_friends'] /* email is necessary for login behavior */
        }
    },

    google: {
        name: 'Google',
        protocol: 'oauth2',
        strategy: require('passport-google-oauth').OAuth2Strategy,
        options: {
            clientID: 'your-client-id',
            clientSecret: 'your-client-secret'
        }
    }
};
