define(['moment-range'], function (moment) {
    'use strict';


    var isMomentRange = function(val) {
        return val && val.start && val.end && moment.isMoment(val.start) && moment.isMoment(val.end);
    };

    return isMomentRange;
});

