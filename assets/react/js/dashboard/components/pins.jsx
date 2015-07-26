/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 27/05/2015.
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */

'use strict';

var React = require('react');
var $ = require('jquery');
var imagesLoaded = require('imagesloaded');
var masonry = require('masonry');

var PinCard = require('./PinCard.jsx');
var Notifications = require('./Notifications.jsx');
var UserMenu = require('./UserMenu.jsx');



var Pins = React.createClass({

    getInitialState: function () {
        return {
            pins: {},
            homeClass: "",
            createClass: "",
            mapClass: ""
        }
    },


    componentWillMount: function () {
        this.getPins();
    },


    componentDidMount: function () {
        var $container = $('.masonry-container');

        imagesLoaded(".masonry-container", function () {
            masonry(".masonry-container", {
                columnWidth: '.item',
                itemSelector: '.item'
            });
        });


        var homeClass;
        var createClass;
        var mapClass;

        switch (this.props.page) {
            case "home":
                homeClass = "active";
                break;
            case "create":
                createClass = "active";
                break;
            case "map":
                mapClass = "active";
                break;
            default:
                homeClass = "active";
                break;
        }

        this.setState({
            homeClass: homeClass,
            createClass: createClass,
            mapClass: mapClass
        });

    },


    handleSubmit: function (event) {
        // Prevent Default Behavior
        event.preventDefault();

        // Get query
        var query = $('#search').val();

        if (query.length > 0) {
            $.ajax({
                url: "/search/" + query,
                method: "GET",
                success: function (data) {
                    // Update count
                    this.setState({pins: data});
                }.bind(this)
            });
        }
    },

    // Load Pins
    getPins: function () {
        $.ajax({
            url: "/pin",
            success: function (data) {
                this.setState({pins: data.reverse()});
            }.bind(this)
        });
    },

    render: function () {

        var pins;
        var self = this;


        var searchStyle = {
            "margin-top": "12px"
        };

        var fixedMargin = {
            "margin-left": "-16px"
        };

        if (this.state.pins.length > 0) {

            pins = this.state.pins.map(function (pin, index) {
                //console.debug("Pin" + index + " Info:" + JSON.stringify(pin))
                return (
                    <PinCard pin={pin} key={pin.id} />
                );
            });
        }
        return (
            <div>
                {/* <Header /> */}
                <div className="navbar">
                    <div className="navbar-inner">
                        <a className="brand" href="#">Korko</a>
                        <ul className="nav">
                            <li className={this.state.homeClass}>
                                <a href="/">Home</a>
                            </li>
                            <li className={this.state.createClass}>
                                <a href="/pin/create">Add</a>
                            </li>
                            <li className={this.state.mapClass}>
                                <a href="/map/app">Browse</a>
                            </li>
                        </ul>

                        {/* Search Part */}
                        <form role="form" onSubmit={this.handleSubmit} className="navbar-search pull-left"
                              style={searchStyle}>
                            <input id="search" type="text" className="search-query" placeholder="Search"/>
                        </form>

                        <ul className="nav pull-right">
                            {/* Notifications Part */}
                            <Notifications />

                            {/* User Part: is it needed? */}
                            <UserMenu />
                        </ul>

                    </div>

                </div>
                <div className="row masonry-container" style={fixedMargin}>
                    {pins}
                </div>
            </div>
        );
    }
});

module.exports = Pins;