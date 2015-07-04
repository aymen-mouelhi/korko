/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 09/05/2015.
 */
requirejs.config({
    paths: {
        'react': '/bower_components/react/react-with-addons',
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'classnames': '/bower_components/classnames/index',
        'react-bootstrap': '/bower_components/react-bootstrap/react-bootstrap.min',
        'underscore': '/bower_components/underscore/underscore-min',
        'geolocator': '/bower_components/geolocator/src/geolocator.min',
        'app': '/react/js/landing/components',
        'utils': '/react/js/landing/utils/utils'
    },
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(['react', 'app/App'],
    function (React, App, classnames) {

        // as soon as this file is loaded, connect automatically,
        //var socket = io.connect();
        React.render(
            React.createElement(App),
            document.getElementById('react')
        );

    }); //require