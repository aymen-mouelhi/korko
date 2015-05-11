/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'app/Categories'], function (React, Categories) {
    'use strict';

    // Todo: Loop over categories

    var Dashboard = React.createClass({

        render: function () {
            return (
                <div>
                    <Categories url={'/categories'}/>
                </div>
            );
        }
    });

    return Dashboard;
});