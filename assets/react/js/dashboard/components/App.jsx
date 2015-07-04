/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'app/Pins'], function (React, Pins) {
    'use strict';

    var Dashboard = React.createClass({

        render: function () {
            return (
                <div>
                    <Pins />
                </div>
            );
        }
    });

    return Dashboard;
});