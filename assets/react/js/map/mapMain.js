requirejs.config({
    paths: {
        'react': '/bower_components/react/react-with-addons',
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'underscore': '/bower_components/underscore/underscore-min',
        'geolocator': '/bower_components/geolocator/src/geolocator.min',
        'local-app': '/react/js/map/components',
        'geo-suggest': '/bower_components/react-geosuggest/dist/react-geosuggest.min',
        'utils': '/react/js/map/utils/utils',
        'imagesloaded': '/bower_components/imagesloaded/imagesloaded.pkgd.min',
        'masonry': '/bower_components/masonry/dist/masonry.pkgd.min',
        'moment': '/bower_components/moment/moment',
        'dashboard': '/react/js/dashboard/components',
        'app': '/react/js/dashboard/components'
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

require(['react', 'local-app/App', 'geolocator'],
    function (React, App, geolocator) {

        // as soon as this file is loaded, connect automatically,
        //var socket = io.connect();
        React.render(
            React.createElement(App),
            document.getElementById('react')
        );

    }); //require