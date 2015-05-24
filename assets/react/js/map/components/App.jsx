/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'app/Filters', 'app/Map', 'app/PinCollection'], function (React, Filters, Map, PinCollection) {
    'use strict';


    var ConnectorApp = React.createClass({

        render: function () {
            return (
                <div>
                    <div id="sidebar">
                        <Filters />
                        <PinCollection />
                    </div>
                    <Map />
                </div>
            );
        }
    });

    return ConnectorApp;

});