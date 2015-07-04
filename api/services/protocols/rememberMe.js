/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 17/05/2015.
 */
/**
 * Passport Remember Me (cookie) Strategy
 *
 * This strategy consumes a remember me token, supplying the user the
 * token was originally issued to. The token is single-use, so a new
 * token is then issued to replace it.
 *
 * @param {Object}   req
 * @param {string}   token
 * @param {Function} next
 */


module.exports = {

    verify: function (req, token, next) {
        User.consumeSessionToken(token, function (err, user) {
            next(err, user);
        });
    },

    issue: function (req, next) {
        User.issueSessionToken(req.user, next);
    }
};

