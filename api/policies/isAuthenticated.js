/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 11/05/2015.
 */

module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        return res.redirect('/login');
    }
};