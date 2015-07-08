/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 10/05/2015.
 */

requirejs.config({
    paths: {
        'react': '/bower_components/react/react-with-addons',
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'classnames': '/bower_components/classnames/index',
        'react-bootstrap': '/bower_components/react-bootstrap/react-bootstrap.min',
        'underscore': '/bower_components/underscore/underscore-min',
        'geolocator': '/bower_components/geolocator/src/geolocator.min',
        'app': '/react/js/dashboard/components',
        'showdown': '/bower_components/showdown/compressed/showdown',
        'imagesloaded': '/bower_components/imagesloaded/imagesloaded.pkgd.min',
        'masonry': '/bower_components/masonry/dist/masonry.pkgd.min',
        'moment': '/bower_components/moment/min/moment.min'
    },
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(['react', 'app/App', 'moment'],
    function (React, App, moment) {

        // as soon as this file is loaded, connect automatically,
        //var socket = io.connect();
        React.render(
            React.createElement(App),
            document.getElementById('react')
        );

    }); //require