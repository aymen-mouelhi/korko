/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'app/Air'], function (React, Air) {
    'use strict';

    var LandingApp = React.createClass({

        render: function () {
            return (
                <div>
                    <Air />
                </div>
            );
        }
    });

    return LandingApp;

});