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
define(['react', 'app/Notifications', 'app/UserMenu'], function (React, Notifications, UserMenu) {
    'use strict';


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


        render: function () {
            return (

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
                                <a href="/map">Browse</a>
                            </li>
                        </ul>

                        <ul className="nav pull-right">
                            {/* Notifications Part */}
                            <Notifications />

                            {/* Search Part */}

                            {/* User Part: is it needed? */}
                            <UserMenu />
                        </ul>


                    </div>


                </div>
            );
        }
    });

    return Header;
});