/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 20/05/2015.
 */
requirejs.config({
    paths: {
        'react': '/bower_components/react/react-with-addons',
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'underscore': '/bower_components/underscore/underscore-min',
        'geolocator': '/bower_components/geolocator/src/geolocator.min',
        'app': '/react/js/neighborhood/components',
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

require(['react', 'app/Map', 'geolocator'],
    function (React, Map, geolocator) {

        React.render(
            React.createElement(Map),
            document.getElementById('react')
        );

    }); //require