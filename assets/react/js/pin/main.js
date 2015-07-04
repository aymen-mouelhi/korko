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
        'local-calendar': '/react/js/pin/calendar',
        'local-utils': '/react/js/pin/utils',
        'calendar': '/js/dependencies/calendar',
        'dashboard': '/react/js/dashboard/components',
        'geolocator': '/bower_components/geolocator/src/geolocator.min',
        'moment': '/bower_components/moment/min/moment.min',
        'moment-range': 'https://cdnjs.cloudflare.com/ajax/libs/moment-range/2.0.2/moment-range.min',
        'react-daterange-picker': '../node_modules/react-daterange-picker/dist/DateRangePicker',
        'immutable': 'https://cdnjs.cloudflare.com/ajax/libs/immutable/3.7.4/immutable'
    },
    shim: {
        'geolocator': {
            exports: 'geolocator'
        },
        'underscore': {
            exports: '_'
        },
        'calendar': {
            exports: 'Calendar'
        },
        'react-daterange-picker': {
            exports: 'DateRangePicker'
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