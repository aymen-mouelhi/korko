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
var Pins = require('./pins.jsx');
var Notifications = require('./Notifications.jsx');
var UserMenu = require('./UserMenu.jsx');

var Dashboard = React.createClass({

    getInitialState: function () {
        return {
            pins: {},
            homeClass: "",
            createClass: "",
            mapClass: "",
            url: "/pin"
        }
    },

    componentDidMount: function () {
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
            this.setState({url: "/search/" + query});

            /*
             $.ajax({
             url: "/search/" + query,
             method: "GET",
             success: function (data) {
             // Update count
             this.setState({pins: data});
             }.bind(this)
             });
             */
        }
    },

    render: function () {

        var searchStyle = {
            "margin-top": "12px"
        };

        var fixedRoght = {
            "margin-left": "60%"
        };

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

                <Pins url={this.state.url}/>
            </div>
        );
    }
});

module.exports = Dashboard;