/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'app/Hero', 'app/Header'], function (React, Hero, Header) {
    'use strict';

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

    return Air;
});