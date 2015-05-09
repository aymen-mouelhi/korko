/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'app/Header', 'app/Hero', 'app/Search'], function (React, Header, Hero, Search) {
    'use strict';

    var LandingApp = React.createClass({

        render: function () {
            return (
                <div>
                    <Header />
                    <div>
                        <Hero />
                        <Search />
                    </div>
                </div>
            );
        }
    });

    return LandingApp;

});