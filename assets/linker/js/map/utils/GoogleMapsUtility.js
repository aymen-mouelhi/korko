define([],function(){

// Google Maps API
    var GoogleMapsUtiliy = (function () {

        var circles = [];
        var markers = [];
        var radius = 500;

        var pinString = '<div class="pin">' +
            '<img src="https://s-media-cache-ak0.pinimg.com/736x/cc/3d/df/cc3ddf58be8e872615d828e77fa1829f.jpg" />' +
            '<p>Home sweet Home</p>' +
            '</div>';

        var infoWindowOptions = {
            maxWidth: 360,
            content: pinString
        };

        var infowindow = new google.maps.InfoWindow(infoWindowOptions);
        var map = null;

        function GoogleMapsUtiliy(location){

            var that = this;

            // Define Map Options
            var mapOptions = {
                zoom: 15,
                center: location
            };

            // Create Map
            this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            // Register to event tilesLoaded
            // Position should be fixed
            google.maps.event.addListener(this.map, 'tilesloaded', function () {
                // Todo: create events and make this event be caught from caller class
                document.getElementById('map-canvas').style.position = 'fixed';
                $('.filters').css('position', 'relative');
                $('.filters').css('overflow-y', 'hidden');

                // Fix Size Issue
                google.maps.event.trigger(that.map, "resize");
            });
        }

        function getMap(){
            return this.map;
        }

        function setMap(map){
            this.map = map;
        }

        function getCircles(){
            return this.circles;
        }

        function setCircles(circles){
            this.circles = circles;
        }

        function getMarkers(){
            return this.markers;
        }

        function setMarkers(markers){
            this.markers = markers;
        }

        function addCircle(location) {
            // Create Circle
            var circle = new google.maps.Circle({
                map: map,
                radius: radius,    // in m
                fillColor: '#004de8',
                fillOpacity: 0.27,
                editable: true,
                strokeColor: '#004de8',
                strokeOpacity: 0.62,
                strokeWeight: 1,
                center: location
            });

            // Add circle to the list of circles
            circles.push(circle);
        }

        function removeCircle(circle) {
            circle.setMap(null);
        }

        function removeAllCircles(){
            for(var i =0; i<circles; i++){
                // Remove Circle
                removeCircle(circles[i]);
            }
        }

        function addMarker(place) {
            var that = this;

            // Origins, anchor positions and coordinates of the marker
            // increase in the X direction to the right and in
            // the Y direction down.
            var image = {
                url: 'images/markers.png',
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
            marker.setMap(map);

            // Add to markers
            markers.push(marker);

            // Show Info Window
            google.maps.event.addListener(marker, 'click', function () {
                //var contentStr = '<strong>' + place.name + '</strong><br />';
                //infowindow.setContent(contentStr);
                infowindow.open(map, marker);
            });
        }

        function removeMarker(marker) {
            marker.setMap(null);
        }

        function removeAllMarkers() {
            for(var i =0; i<markers; i++){
                // Remove Marker
                removeCircle(markers[i]);
            }
        }

    }());

    return GoogleMapsUtiliy;

});