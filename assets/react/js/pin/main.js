/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 24/05/2015.
 */
requirejs.config({
    paths: {
        'react': '/bower_components/react/react-with-addons',
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'react-bootstrap': '/bower_components/react-bootstrap/react-bootstrap.min',
        'underscore': '/bower_components/underscore/underscore-min',
        'validator': '/bower_components/bootstrap-validator/dist/validator.min',
        'utils': '/react/js/map/utils/utils',
        'neighborhood': '/react/js/neighborhood/components',
        'app': '/react/js/dashboard/components',
        'local-app': '/react/js/pin/components',
        'dashboard': '/react/js/dashboard/components',
        'geolocator': '/bower_components/geolocator/src/geolocator.min',
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

require(['react', 'local-app/App', 'local-app/Pin'],
    function (React, App, Pin) {

        if (document.getElementById('react')) {
            if (document.getElementById('react').getAttribute("pin")) {
                // Todo: Load Pin.jsx
                React.render(
                    React.createElement(Pin, {pin: document.getElementById('react').getAttribute("pin")}),
                    document.getElementById('react')
                );

            } else {
                React.render(
                    React.createElement(App),
                    document.getElementById('react')
                );
            }
        }

    }); //require