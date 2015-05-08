define([],function () {
        var Utils = {
            updateLocation: function (location, radius) {
                // Location Object
                var gLocation = new google.maps.LatLng(location.location.lat, location.location.lng);
                // Get Reference to the map
                var map = document.getElementById('map-canvas').gMap;
                // Set Center
                map.setCenter(gLocation);
            },

            getDomain: function(){
                return location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');
            }
        };

        return Utils;
    }
);