/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 24/05/2015.
 */
requirejs.config({
    paths: {
        'react': '/bower_components/react/react-with-addons',
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'react-bootstrap': '/bower_components/react-bootstrap/react-bootstrap.min',
        'underscore': '/bower_components/underscore/underscore-min',
        'utils': '/react/js/map/utils/utils',
        'neighborhood': '/react/js/neighborhood/components',
        'app': '/react/js/pin/components',
        'geolocator': '/bower_components/geolocator/src/geolocator.min'
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

require(['react', 'app/App'],
    function (React, App) {

        React.render(
            React.createElement(App),
            document.getElementById('react')
        );

    }); //require