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
            drawingManager.setMap(map);
            // hide remove button
            $("#remove-button").hide();
        });
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


            var params = Utils.getScriptParams("argScript");

            return {
                neighborhood: params.n,
                uid: params.uid,
                map: null,
                RADIUS: 100,
                EARTH_RADIUS: 6378137,
                infowindow: new google.maps.InfoWindow(infoWindowOptions)
            }
        },

        componentWillMount: function () {
            // Load google maps
            //setTimeout(google.maps.event.addDomListener(window, 'load', jQuery.proxy(this.initialize, this)), 2000);
        },

        // Handle responsive maps
        resizeMap: function () {
            var mapParentWidth = $('#map-container').width();
            var mapParentHeight = $('#map-container').height();
            $('#map-canvas').width(mapParentWidth);
            $('#map-canvas').height(mapParentHeight - 10);
            google.maps.event.trigger($('#map-canvas'), 'resize');
            console.log(mapParentWidth);
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
            var self = this;

            console.log(location);

            // resize the map whenever the window resizes
            $(window).resize(jQuery.proxy(this.resizeMap, this));

            // Todo: Center Location must be center of my neighborhood

            var centerLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

            // Define Map Options
            var mapOptions = {
                zoom: 15,
                streetViewControl: true,
                overviewMapControl: true,
                center: centerLocation
            };

            // Create Map
            this.state.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


            // Store a reference to the map
            document.getElementById('map-canvas').gMap = this.state.map;


            // Position should be fixed
            google.maps.event.addListener(this.state.map, 'tilesloaded', function () {

                document.getElementById('map-canvas').style.position = 'fixed';

                // Fix Size Issue
                //google.maps.event.trigger(self.state.map, "resize");

                self.resizeMap();

                // self.state.map.setCenter(centerLocation);

                console.log("tilesloaded: Is it called again?");
            });



            // Check if user already has a neighborhood
            if (JSON.parse(this.state.neighborhood).length > 0) {

                // Todo: check nighborhood type (circle / polygon)

                var neighborhood;
                var bounds = new google.maps.LatLngBounds();
                var i;
                var polygonCoords = [];

                // Get polygon coordinates
                for (i = 0; i < JSON.parse(this.state.neighborhood).length; i++) {
                    var item = JSON.parse(this.state.neighborhood)[i];
                    polygonCoords.push(new google.maps.LatLng(item.A, item.F));
                }

                // Extend bounds
                for (i = 0; i < polygonCoords.length; i++) {
                    bounds.extend(polygonCoords[i]);
                }

                if (this.state.neighborhood_type === "polygon") {
                    // Construct the polygon.
                    neighborhood = new google.maps.Polygon({
                        paths: polygonCoords,
                        strokeWeight: 0,
                        fillOpacity: 0.45,
                        editable: true,
                        fillColor: '#1E90FF',
                        map: this.state.map
                    });
                } else {
                    // Center
                    neighborhood = new google.maps.Circle({
                        paths: polygonCoords,
                        strokeWeight: 0,
                        fillOpacity: 0.45,
                        editable: true,
                        fillColor: '#1E90FF',
                        map: this.state.map
                    });

                }


                // Recenter Map
                this.state.map.setCenter(bounds.getCenter());

            } else {

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
            }


            // add button remove
            // Create the DIV to hold the control and
            // call the RemoveControl() constructor passing
            // in this DIV.

            var removeControlDiv = document.createElement('div');
            var removeControl = new RemoveControl(removeControlDiv, this.state.map);
            removeControlDiv.index = 1;
            this.state.map.controls[google.maps.ControlPosition.TOP_LEFT].push(removeControlDiv);


            // Polygon drawed
            google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {

                var neighborhood = {
                    type: "",
                    coordinates: []
                };

                if (event.type == google.maps.drawing.OverlayType.CIRCLE) {

                    neighborhood.type = "circle";

                    var radius = event.overlay.getRadius();

                    var circle = event.overlay;

                    // Radius Changed
                    google.maps.event.addListener(circle, 'radius_changed', function () {

                        console.info("Radius has been changed: " + circle.getRadius());

                        // Update Radius
                        self.state.RADIUS = circle.getRadius();

                        console.info(self.state.map);

                        // Todo: save new circle?
                    });

                    // Drag End
                    google.maps.event.addListener(circle, 'dragend', function () {

                        console.info("Dragend: " + circle.getRadius());

                        // Update Radius
                        self.state.RADIUS = circle.getRadius();

                        // Todo: save new circle?
                    });

                    // Center Changed
                    google.maps.event.addListener(circle, 'center_changed', function () {

                        console.info("Center Changed: " + circle.getCenter());

                        var center = circle.getCenter();

                        // Todo: save new circle?
                    });

                } else if (event.type == google.maps.drawing.OverlayType.POLYGON) {
                    console.info("received event after polygon drawn: " + event);
                    console.info("Coordinates must be: " + event.overlay.getPath().getArray());
                    //var overlay = event.overlay;
                    neighborhood.type = "polygon";
                }

                // Set neighborhood
                //neighborhood.coordinates = event.overlay;

                // Coordinates Array
                neighborhood.coordinates = event.overlay.getPath().getArray();

                //console.info("Neighborhood data: " + JSON.stringify(neighborhood));
                console.info("Neighborhood data: " + event.overlay);

                // Todo: add a button to save overall status, saving should be done explicitly
                // Todo: Ajax request to store neighborhood for user id

                // Call backend
                Utils.call("POST", "/user/" + self.state.uid, neighborhood);

                // Show remove button
                $('#remove-button').show();

                if (drawingManager) {
                    // hide drawing panel
                    drawingManager.setOptions({
                        drawingControl: false
                    });

                    // Remove Map
                    drawingManager.setMap(null);
                }

            });

        },

        //The callback function executed when the location could not be fetched.
        onGeoError: function (error) {
            console.log(error);
        },

        // Todo: move method to utilities
        deg2rad: function (deg) {
            return deg * (Math.PI / 180);
        },

        /**
         * Calculate distance between 2 Google Maps Positions
         * @param pos1
         * @param pos2
         * @returns {number}
         */

        // Todo: move method to utilities

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


        render: function () {
            return (
                <div id="map-canvas" className="map">
                </div>
            );
        }
    });

    return Map;

});
