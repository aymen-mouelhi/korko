define([], function () {
        var Utils = {
            updateLocation: function (location, radius) {
                // Location Object
                var gLocation = new google.maps.LatLng(location.location.lat, location.location.lng);
                // Get Reference to the map
                var map = document.getElementById('map-canvas').gMap;
                // Set Center
                map.setCenter(gLocation);
            },

            getDomain: function () {
                return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
            },

            /**
             * Create Cookie
             * @param name
             * @param value
             * @param days
             */
            createCookie: function (name, value, days) {
                var expires;
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    expires = "; expires=" + date.toGMTString();
                } else {
                    expires = "";
                }
                document.cookie = name + "=" + value + expires + "; path=/";
            },

            /**
             * Get Cookie
             * @param c_name
             * @returns {*}
             */
            getCookie: function (c_name) {
                if (document.cookie.length > 0) {
                    c_start = document.cookie.indexOf(c_name + "=");
                    if (c_start != -1) {
                        c_start = c_start + c_name.length + 1;
                        c_end = document.cookie.indexOf(";", c_start);
                        if (c_end == -1) {
                            c_end = document.cookie.length;
                        }
                        return unescape(document.cookie.substring(c_start, c_end));
                    }
                }
                return "";
            }
        };

        return Utils;
    }
);