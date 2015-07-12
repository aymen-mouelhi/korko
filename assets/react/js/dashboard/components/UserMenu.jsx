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


var UserMenu = React.createClass({

    getInitialState: function () {
        return {
            notifications: {}
        }
    },

    componentWillMount: function () {
        this.getNotifications();
    },

    // Get User's notifications
    getNotifications: function () {
        $.ajax({
            url: "/notification",
            success: function (data) {
                this.setState({notifications: data});
            }.bind(this)
        });
    },

    componentDidMount: function () {

    },

    render: function () {

        var imgStyle = {
            "display": "inline-block;",
            "width": "32px;",
            "height": "32px;",
            "margin-right": "15px;",
            "vertical-align": "top;",
            "border": "0;",
            "-webkit-border-radius": "50%;",
            "-moz-border-radius": "50%;",
            "border-radius": "50%;"
        };

        // Todo: Change user image
        var icon = "http://api.randomuser.me/portraits/thumb/men/16.jpg";

        return (
            <li className="dropdown dropdown-notification">
                <img className="media-object dropdown-toggle btn-notification" data-toggle="dropdown" src={icon} style={imgStyle} />

                <ul className="dropdown-menu dropdown-notifications">
                    <li>
                        <span className="title"><a href="/user/account">My Profil</a></span>
                    </li>
                    <li>
                        <span className="title">My Pins</span>
                    </li>
                    <li>
                        <span className="title">Settings</span>
                    </li>
                    <li>
                        <span className="title">Logout</span>
                    </li>
                </ul>
            </li>
        );
    }
});

module.exports = UserMenu;