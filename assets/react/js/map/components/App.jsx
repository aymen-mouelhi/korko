/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'local-app/Filters', 'local-app/Map', 'local-app/PinCollection', 'dashboard/Header'], function (React, Filters, Map, PinCollection, Header) {
    'use strict';


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

    return ConnectorApp;

});