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
var Filters = require('./Filters.jsx');
var Map = require('./Map.jsx');
var PinCollection = require('./PinCollection.jsx');
var Header = require('../../dashboard/components/Header.jsx');

var ConnectorApp = React.createClass({

    render: function () {
        return (
            <div>
                <div className="block">
                    <Header />

                    <div id="sidebar">
                    {/*   <Filters /> */}
                        <PinCollection />
                    </div>
                    <Map />
                </div>
            </div>
        );
    }
});

module.exports = ConnectorApp;