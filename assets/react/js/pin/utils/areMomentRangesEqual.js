define( function () {
    'use strict';

    var areMomentRangesEqual = function(r1, r2) {
        return r1.start.isSame(r2.start) && r1.end.isSame(r2.end);
    };

    return areMomentRangesEqual
});
