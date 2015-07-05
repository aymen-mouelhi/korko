/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 28/05/2015.
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
var Notifications = require('./Notifications.jsx');
var UserMenu = require('./UserMenu.jsx');



var Header = React.createClass({

    getInitialState: function () {
        return {
            homeClass: "",
            createClass: "",
            mapClass: ""
        }

    },

    componentWillMount: function () {

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

        $.ajax({
            url: "/search?q=" + query,
            method: "POST",
            success: function (data) {
                // Update count
                //this.setState({pins: data});
            }.bind(this)
        });
    },


    render: function () {

        var searchStyle = {
            "margin-top": "12px"
        };

        return (

            <div className="navbar">
                <div className="navbar-inner">
                    <a className="brand" href="/">Korko</a>
                    <ul className="nav">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li className="active">
                            <a href="/pin/create">Add</a>
                        </li>
                        <li className="">
                            <a href="/map/app">Browse</a>
                        </li>
                    </ul>

                        {/* Search Part */}
                    <form role="form" onSubmit={this.handleSubmit} className="navbar-search pull-left" style={searchStyle}  >
                        <input id="search" type="text" className="search-query" placeholder="Search" />
                    </form>

                    <ul className="nav pull-right">
                            {/* Notifications Part */}
                        <Notifications />

                            {/* User Part: is it needed? */}
                        <UserMenu />
                    </ul>


                </div>


            </div>
        );
    }
});

module.exports =  Header;