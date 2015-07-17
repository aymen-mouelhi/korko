/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 17/07/2015.
 */
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
var Air = require('./Air.jsx');

var LandingApp = React.createClass({
    render: function () {
        return (
            <div>
                <Air />
            </div>
        );
    }
});

module.exports = LandingApp;