/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
'use strict';

var React = require('react');
var jQuery = require('jquery');
//var geolocator = require('geolocator');
var _ = require('underscore');
var Utils = require('../utils/utils');


var drawingManager;
var neighborhood;

/**
 * The RemoveControl adds a control to the map that removes the created polygon / circle
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function RemoveControl(controlDiv, map) {

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.id = "remove-button";
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Remove the neighborhood';
    controlUI.style.display = 'none';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '12px';
    controlText.style.lineHeight = '30px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Remove';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to
    // Chicago
    google.maps.event.addDomListener(controlUI, 'click', function () {
        //this.state.map.setCenter(chicago)
        // Todo: remove polygon
        console.log("polygon / circle should be somehow removed ");
        neighborhood.setMap(null);

        drawingManager.setOptions({
            drawingControl: true
        });
        // Remove map
        drawingManager.setMap(null);
        // hide remove button
        $("#remove-button").hide();
    });
}


function MenuControl(controlDiv, map) {
    var menuUI = document.createElement('div');

    menuUI.style.backgroundColor = '#fff';
    menuUI.style.border = '2px solid #fff';
    menuUI.style.borderRadius = '3px';
    menuUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    menuUI.style.cursor = 'pointer';
    menuUI.style.marginBottom = '22px';
    menuUI.style.textAlign = 'center';

    var ul = document.createElement("ul");
    var li = document.createElement("li");

    li.innerHTML = "Remove";
    li.style.color = 'rgb(25,25,25)';
    li.style.fontFamily = 'Roboto,Arial,sans-serif';
    li.style.fontSize = '12px';
    li.style.lineHeight = '30px';
    li.style.paddingLeft = '5px';
    li.style.paddingRight = '5px';

    ul.appendChild(li);
    menuUI.appendChild(ul);
    controlDiv.appendChild(menuUI);
}


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

        var centerLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        //var centerLocation = new google.maps.LatLng(43.583302, 7.116700000000037);

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
        //this.state.map.data.setControls(['Polygon']);

        // Store a reference to the map
        document.getElementById('map-canvas').gMap = this.state.map;

        // Places API
        var service = new google.maps.places.PlacesService(this.state.map);

        // Point where to search
        this.state.searchArea = centerLocation;

        google.maps.event.addListenerOnce(this.state.map, 'idle', function () {
            // do something only the first time the map is loaded
            console.debug("Event listener for Idle");

            document.getElementById('map-canvas').style.position = 'fixed';

            $('.filters').css('position', 'relative');
            $('.filters').css('overflow-y', 'hidden');

            // Fix Size Issue
            google.maps.event.trigger(that.state.map, "resize");
        });

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


        var polyOptions = {
            strokeWeight: 0,
            fillOpacity: 0.45,
            editable: true,
            fillColor: '#1E90FF'
        };


        drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_LEFT,
                drawingModes: [
                    google.maps.drawing.OverlayType.CIRCLE,
                    google.maps.drawing.OverlayType.POLYGON
                ]
            },
            circleOptions: {
                radius: this.state.RADIUS,    // in m
                fillColor: '#004de8',
                fillOpacity: 0.27,
                editable: true,
                strokeColor: '#004de8',
                strokeOpacity: 0.62,
                strokeWeight: 1
            },
            polygonOptions: polyOptions,
            map: this.state.map
        });

        // add button remove
        // Create the DIV to hold the control and
        // call the RemoveControl() constructor passing
        // in this DIV.

        var removeControlDiv = document.createElement('div');
        var removeControl = new RemoveControl(removeControlDiv, this.state.map);
        removeControlDiv.index = 1;
        this.state.map.controls[google.maps.ControlPosition.TOP_LEFT].push(removeControlDiv);


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


        // Polygon drawed
        google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
            if (event.type == google.maps.drawing.OverlayType.CIRCLE) {
                var radius = event.overlay.getRadius();
            } else if (event.type == google.maps.drawing.OverlayType.POLYGON) {
                // Todo: Store neighborhood
                console.info("received event after polygon drawn: " + event);
                console.info("Coordinates must be: " + event.overlay.getPath().getArray());
                // Todo: add remove button
                // Todo: right click
                //var overlay = event.overlay;
            }
            // Set neighborhood
            neighborhood = event.overlay;

            // Todo: Store neighborhood

            // Show remove button
            $('#remove-button').show();

            // hide drawing panel
            drawingManager.setOptions({
                drawingControl: false
            });

            // Remove Map
            drawingManager.setMap(null);

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
     * Get Center of polygon
     * @param polygonCoords
     */
    getCenter: function (coordinates) {
        var bounds = new google.maps.LatLngBounds();

        var polygonCoords = [];

        for (i = 0; i < coordinates.length; i++) {
            var item = coordinates[i];
            polygonCoords.push(new google.maps.LatLng(item.A, item.F));
        }

        for (var i = 0; i < polygonCoords.length; i++) {
            bounds.extend(polygonCoords[i]);
        }

        return bounds.getCenter();
    },

    /**
     * Search for items near the specified search area
     */
    nearbySearch: function () {
        var self = this;

        var url = '/pin';

        var xhr = $.get(url, function (pins) {
            // Remove All Markers
            self.removeAllMarkers();

            //that.state.markers = [];
            // Loop over items in locations.json
            _.each(pins, function (pin) {
                if (pin.location) {

                    var center;

                    if (pin.location.type === "circle") {

                        center = pin.location.coordinates.center;
                    } else {
                        // Get Center of location neighborhood
                        center = self.getCenter(pin.location.coordinates);
                    }

                    console.debug("Center location: " + center);

                    var location = new google.maps.LatLng(center.A, center.F);

                    console.log("Search Area: " + self.state.searchArea);
                    console.log("RADIUS: " + self.state.RADIUS);

                    // check Distance
                    if (self.distance(location, self.state.searchArea) <= self.state.RADIUS) {
                        self.createCustomMarker(location, pin);
                    }

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

    /**
     * Create markers
     * @param place
     * @param pin
     */
    createCustomMarker: function (place, pin) {

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

            var content = "";

            if(pin.images){
                image = pin.images[0].path;

                content = '<div class="pin"><img src="' + image + '" /><p><a href="/pin/' + pin.id + '">' + pin.title + '</a></p></div>';
            }else{
                content = '<div class="pin"><p><a href="/pin/' + pin.id + '">' + pin.title + '</a></p></div>';
            }

            //var contentStr = '<strong>' + place.name + '</strong><br />';

            that.state.infowindow.setContent(content);

            that.state.infowindow.open(that.state.map, marker);
        });
    },

    updateLocation: function (location) {
        this.state.map.setCenter(location);
    },

    render: function () {

        var hidden = {
            display: "none"
        };

        return (

            <div id="map-canvas" className="map">
                <div id="menu" style={hidden}>
                    <ul>
                        <li>Remove</li>
                    </ul>
                </div>
            </div>

        );
    }
});

module.exports = Map;