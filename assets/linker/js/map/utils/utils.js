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
            },

            /**
             * Get query parameters
             * @param query
             * @returns {Object}
             */
            parseQuery: function (query) {
                var Params = new Object();
                if (!query) return Params; // return empty object
                var Pairs = query.split(/[;&]/);
                for (var i = 0; i < Pairs.length; i++) {
                    var KeyVal = Pairs[i].split('=');
                    if (!KeyVal || KeyVal.length != 2) continue;
                    var key = unescape(KeyVal[0]);
                    var val = unescape(KeyVal[1]);
                    val = val.replace(/\+/g, ' ');
                    Params[key] = val;
                }
                return Params;
            },

            /**
             * Get params passed to a script having the provided id
             * @param id
             * @returns {Object}
             */
            getScriptParams: function (id) {
                //script gets the src attribute based on ID of page's script element:
                var scriptSource = document.getElementById(id).getAttribute("src");
                var queryString = scriptSource.replace(/^[^\?]+\??/, '');

                var params = Utils.parseQuery(queryString);
                return params;
            },


            /**
             * Call Backend
             * @param method
             * @param url
             * @param data
             * @param callback
             */
            call: function (method, url, data, callback) {
                console.info("Url: " + url);
                console.info("Data: " + JSON.stringify(data));
                $.ajax({
                    'type': method,
                    'async': false,
                    'global': false,
                    'data': data,
                    'url': url,
                    'dataType': "json",
                    'success': function (data) {
                        console.info("User seems to be updated correctly: " + JSON.stringify(data))
                        //callback(null, data);
                    },
                    'error': function (error) {
                        console.info("Error occured: " + JSON.stringify(error))
                        //callback(error, null)
                    }
                });
            }
        };

        return Utils;
    }
);