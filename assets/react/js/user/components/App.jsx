/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 06/08/2015.
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
var Profile = require('./Profile.jsx');

var Dashboard = React.createClass({

    render: function () {
        return (
            <div>
                <Profile />
            </div>
        );
    }
});

module.exports = Dashboard;