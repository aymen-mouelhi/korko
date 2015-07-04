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
define(['react'], function (React) {
    'use strict';


    var Dashboard = React.createClass({

        getInitialState: function () {
            // Todo: remove user name
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

        setRead: function (notifId) {
            // Update status: read
            $.ajax({
                url: "/notification/" + notifId,
                method: "POST",
                success: function (data) {
                    // Update count
                    // Update visual aspect for read / unread
                    //this.setState({pins: data});
                }.bind(this)
            });

        },


        render: function () {

            var imgStyle = {
                "width": "48px;",
                "height": "48px;"
            };

            var self = this;

            var count = 0;


            var notifications = "";
            if (this.state.notifications.length > 0) {
                notifications = this.state.notifications.map(function (notification, index) {

                    console.log("notification: " + JSON.stringify(notification));
                    var icon;
                    var body;

                    if (!notification.read) {
                        count++;
                    }

                    if ((notification.icon != "") || (notification.sender != "")) {

                        if (notification.icon) {
                            icon = notification.icon;
                        } else {
                            icon = notification.sender.avatar;
                        }

                        console.log("damn icon: " + icon);

                        body =
                            <li onClick={self.setRead.bind(self, notification.id)}>
                                <div className="media">
                                    <a className="pull-left" href="#">
                                        <img className="media-object" alt="48x48" src={icon} style={imgStyle} />
                                    </a>
                                    <div className="media-body">
                        {notification.body}
                                    </div>
                                </div>
                            </li>
                    } else {
                        // no sender and no icon
                        body = <li onClick={self.setRead.bind(self, notification.id)}>
                            <span className="title">{notification.body}</span>
                        </li>
                    }

                    return (
                    {body}
                    );
                });
            }


            return (
                <li className="dropdown dropdown-notification">
                    <a href="#" className="dropdown-toggle btn-notification" data-toggle="dropdown">
                    {count}
                    </a>
                    <ul className="dropdown-menu dropdown-notifications">
                        <li className="header">Notifications</li>
                    {notifications}
                    </ul>
                </li>
            );
        }
    });

    return Dashboard;
});