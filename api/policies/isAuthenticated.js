/**
 * Created by I060307 on 11/05/2015.
 */

module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else{
        return res.redirect('/login');
    }
};