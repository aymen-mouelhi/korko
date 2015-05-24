requirejs.config({
    paths: {
        'react': '/bower_components/react/react-with-addons',
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'underscore': '/bower_components/underscore/underscore-min',
        'geolocator': '/bower_components/geolocator/src/geolocator.min',
        'app': '/react/js/map/components',
        'geo-suggest': '/bower_components/react-geosuggest/dist/react-geosuggest.min',
        'utils': '/react/js/map/utils/utils'
    },
    shim: {
        'geolocator': {
            exports: 'geolocator'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(['react', 'app/App', 'geolocator'],
    function (React, App, geolocator) {

        // as soon as this file is loaded, connect automatically,
        //var socket = io.connect();
        React.render(
            React.createElement(App),
            document.getElementById('react')
        );

    }); //require