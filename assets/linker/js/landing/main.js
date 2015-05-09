/**
 * Created by I060307 on 09/05/2015.
 */
requirejs.config({
    paths: {
        'react': '/bower_components/react/react-with-addons',
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'underscore':'/bower_components/underscore/underscore-min',
        'geolocator':'/bower_components/geolocator/src/geolocator.min',
        'app': '/linker/js/landing/components',
        'utils': '/linker/js/landing/utils/utils'
    },
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(['react', 'app/App'],
    function (React, App) {

        // as soon as this file is loaded, connect automatically,
        //var socket = io.connect();
        React.render(
            React.createElement(App),
            document.getElementById('react')
        );

    }); //require