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
var Hero = require('./Hero.jsx');
var Header = require('./Header.jsx');

var Air = React.createClass({

    render: function () {
        return (
            <div id="content">
                <Header />
                <Hero />
            </div>
        );
    }
});

module.exports = Air;