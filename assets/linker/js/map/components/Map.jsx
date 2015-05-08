/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'geolocator', 'jquery', 'underscore', 'utils'], function (React, geolocator, jQuery, _, Utils) {
  'use strict';


var Map = React.createClass({

    // Todo: Create Wrapper API for Maps / Location Manager

    getInitialState: function () {
        var pinString = '<div class="pin">' +
            '<img src="https://s-media-cache-ak0.pinimg.com/736x/cc/3d/df/cc3ddf58be8e872615d828e77fa1829f.jpg" />' +
            '<p>Home sweet Home</p>' +
            '</div>';

        var infoWindowOptions = {
            maxWidth: 360,
            content: pinString
        };

        return {
            map: null,
            searchArea: null,
            markers: [],
            RADIUS: 100,
            EARTH_RADIUS: 6378137,
            infowindow: new google.maps.InfoWindow(infoWindowOptions)
        }
    },

    componentWillMount: function () {
        // Load google maps
        //setTimeout(google.maps.event.addDomListener(window, 'load', jQuery.proxy(this.initialize, this)), 2000);

    },

    initialize: function () {
        // Extract location from ip: https://github.com/onury/geolocator
        geolocator.locateByIP(jQuery.proxy(this.onGeoSuccess, this), jQuery.proxy(this.onGeoError, this), 2);
    },


    componentDidMount: function () {
        // Extract location from ip: https://github.com/onury/geolocator
        geolocator.locateByIP(jQuery.proxy(this.onGeoSuccess, this), jQuery.proxy(this.onGeoError, this), 2);
    },

    onGeoSuccess: function (location) {
        var that = this;

        console.log(location);

        //var centerLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        var centerLocation = new google.maps.LatLng(43.583302, 7.116700000000037);

        // Create Instance of Google Maps Utility
        //this.state.map = new GoogleMapsUtility(centerLocation);

        // Define Map Options
        var mapOptions = {
            zoom: 15,
            center: centerLocation
        };

        // Create Map
        this.state.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        // this.state.map.data.setControls(['Point', 'LineString', 'Polygon']);
        this.state.map.data.setControls(['Polygon']);

        // Store a reference to the map
        document.getElementById('map-canvas').gMap = this.state.map;

        // Places API
        var service = new google.maps.places.PlacesService(this.state.map);

        // Point where to search
        this.state.searchArea = centerLocation;

        // Position should be fixed
        google.maps.event.addListener(this.state.map, 'tilesloaded', function () {

            document.getElementById('map-canvas').style.position = 'fixed';

            $('.filters').css('position', 'relative');
            $('.filters').css('overflow-y', 'hidden');

            // Fix Size Issue
            google.maps.event.trigger(that.state.map, "resize");

            console.log("Is it called again?");
        });

        // Add a marker with circle
        /*
         var marker = new google.maps.Marker({
         map: map,
         position: new google.maps.LatLng(location.coords.latitude, location.coords.longitude),
         title: 'Home'
         });
         */

        // Add circle overlay and bind to marker
        var circle = new google.maps.Circle({
            map: this.state.map,
            radius: this.state.RADIUS,    // in m
            fillColor: '#004de8',
            fillOpacity: 0.27,
            editable: true,
            strokeColor: '#004de8',
            strokeOpacity: 0.62,
            strokeWeight: 1,
            center: centerLocation
        });

        //circle.bindTo('center', marker, 'position');

        // Radius Changed
        google.maps.event.addListener(circle, 'radius_changed', function () {

            console.info("Radius has been changed: " + circle.getRadius());

            // Update Radius
            that.state.RADIUS = circle.getRadius();

            console.info(that.state.map);

            // Search Again
            that.nearbySearch();
        });

        // Drag End
        google.maps.event.addListener(circle, 'dragend', function () {

            console.info("Dragend: " + circle.getRadius());

            // Update Radius
            that.state.RADIUS = circle.getRadius();

            // Search Again
            that.nearbySearch();
        });

        // Center Changed
        google.maps.event.addListener(circle, 'center_changed', function () {

            console.info("Center Changed: " + circle.getCenter());

            var center = circle.getCenter();

            that.state.searchArea = center;

            // Update Center
            //circle.setCenter(center);
            //that.removeAllMarkers();

            // Search Again
            that.nearbySearch();
        });

        /*
         // Perform search over radius
         var request = {
         location: searchArea,
         radius: RADIUS,
         keyword: "coffee",
         rankBy: google.maps.places.RankBy.PROMINENCE
         };
         service.nearbySearch(request, callback);
         */

        // Todo: Search for items using local data
        this.nearbySearch();
    },

//The callback function executed when the location could not be fetched.
    onGeoError: function (error) {
        console.log(error);
    },

    deg2rad: function (deg) {
        return deg * (Math.PI / 180);
    },

    /**
     * Calculate distance between 2 Google Maps Positions
     * @param pos1
     * @param pos2
     * @returns {number}
     */

    distance: function (pos1, pos2) {
        var p1Lat = pos1.lat();
        var p1Lng = pos1.lng();
        var p2Lat = pos2.lat();
        var p2Lng = pos2.lng();

        var dLat = this.deg2rad(p1Lat - p2Lat);
        var dLon = this.deg2rad(p1Lng - p2Lng);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(this.deg2rad(p1Lat)) * Math.cos(this.deg2rad(p2Lat));
        return this.state.EARTH_RADIUS * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    },

    /**
     * Callback function for places find using Google Places API
     * @param results
     * @param status
     * @param pagination
     */
    callback: function (results, status, pagination) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                if (distance(results[i].geometry.location, this.state.searchArea) <= this.state.RADIUS) {
                    createMarker(results[i]);
                }
            }
            // Store all locations in a seperate json file
            // saveFile(JSON.stringify(results));
        }
    },

    /**
     * Search for items near the specified search area
     */
    nearbySearch: function () {

        var that = this;

        var url = '/location/data';

        var xhr = $.get(url, function (pins) {
            // Remove All Markers
            that.removeAllMarkers();

            //that.state.markers = [];
            // Loop over items in locations.json
            _.each(pins, function (pin) {

                var location = new google.maps.LatLng(pin.location.location.lat, pin.location.location.long);

                console.log("Search Area: " + that.state.searchArea);
                console.log("RADIUS: " + that.state.RADIUS);
                // check Distance
                if (that.distance(location, that.state.searchArea) <= that.state.RADIUS) {
                    that.createCustomMarker(location);
                }

            });
        }, 'json').fail(function (error) {
            console.log("error occured: " + error);
        });
    },

    // Create markers
    createMarker: function (place) {
        console.log(place);
        // Origins, anchor positions and coordinates of the marker
        // increase in the X direction to the right and in
        // the Y direction down.
        var image = {
            url: Utils.getDomain() + '/images/markers.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(22, 32),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(32, 0)
        };
        // Shapes define the clickable region of the icon.
        // The type defines an HTML &lt;area&gt; element 'poly' which
        // traces out a polygon as a series of X,Y points. The final
        // coordinate closes the poly by connecting to the first
        // coordinate.
        var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
        };

        // Create marker
        var marker = new google.maps.Marker({
            position: place.geometry.location,
            icon: image,
            shape: shape,
            title: place.name
        });
        marker.setMap(map);

        // Add to markers
        markers.push(marker);

        google.maps.event.addListener(marker, 'click', function () {
            var contentStr = '<strong>' + place.name + '</strong><br />';
            //infowindow.setContent(contentStr);
            infowindow.open(map, marker);
        });
    },


    removeAllMarkers: function () {
        console.log('trying to remove all markers');

        for (var i = 0; i < this.state.markers.length; i++) {
            console.log("Marker : " + this.state.markers[i]);
            this.state.markers[i].setMap(null);
        }

        this.state.markers = [];
    },

// Create markers
    createCustomMarker: function (place) {

        var that = this;

        console.log(place);
        // Origins, anchor positions and coordinates of the marker
        // increase in the X direction to the right and in
        // the Y direction down.
        var image = {
            url: Utils.getDomain() + '/images/markers.png',
            // This marker is 20 pixels wide by 32 pixels tall.
            size: new google.maps.Size(22, 32),
            // The origin for this image is 0,0.
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            anchor: new google.maps.Point(32, 0)
        };
        // Shapes define the clickable region of the icon.
        // The type defines an HTML &lt;area&gt; element 'poly' which
        // traces out a polygon as a series of X,Y points. The final
        // coordinate closes the poly by connecting to the first
        // coordinate.
        var shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly'
        };

        // Create marker
        var marker = new google.maps.Marker({
            position: place,
            icon: image,
            shape: shape,
            title: place.name
        });

        // set Map
        marker.setMap(this.state.map);

        // Add to markers
        this.state.markers.push(marker);

        // Display Markres
        console.log("Markers: " + this.state.markers);

        // Show Info Window
        google.maps.event.addListener(marker, 'click', function () {
            //var contentStr = '<strong>' + place.name + '</strong><br />';
            //infowindow.setContent(contentStr);
            that.state.infowindow.open(that.state.map, marker);
        });
    },

    updateLocation: function (location) {
        this.state.map.setCenter(location);
    },

    render: function () {
        return (
            <div id="map-canvas" className="map">
            </div>
        );
    }
});

  return Map;

});
