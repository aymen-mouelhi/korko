/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */

'use strict';

var React = require('react');
var Pins = require('./pins.jsx');

var Dashboard = React.createClass({

    render: function () {
        return (
            <div>
                <Pins />
            </div>
        );
    }
});

module.exports = Dashboard;