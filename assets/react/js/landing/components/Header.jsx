/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'react-bootstrap', 'app/Login', 'app/SignUp'], function (React, Bootsrap, Login, SignUp) {
    'use strict';

    var Navbar = Bootsrap.Navbar;
    var CollapsibleNav = Bootsrap.CollapsibleNav;
    var Nav = Bootsrap.Nav;
    var NavItem = Bootsrap.NavItem;
    var button = Bootsrap.button;


    var Header = React.createClass({

        getInitialState: function () {
            return {
                login: false,
                signup: false
            };
        },

        login: function () {
            console.info("Modal login should be displayed");
            this.setState({
                    login: true,
                    signup: false
                }
            );
        },

        signUp: function () {
            console.info("Modal SignUp should be displayed");
            this.setState({
                    login: false,
                    signup: true
                }
            );
        },

        handleKeyUp: function (e) {
            console.log(e.type, e.which, e.timeStamp);
            if (e.keyCode === 27) { // Escape
                this.setState({
                    login: false,
                    signup: false
                });
            }
        },

        render: function () {

            return (
                <div id="header" className="airbnb-header new shift-with-hiw" onKeyUp={this.handleKeyUp}>
                    <div className="regular-header clearfix hide-sm" id="old-header">
                    {/* <a href="/" className="header-belo pull-left"></a> */}
                        <ul className="nav pull-right logged-out list-unstyled medium-right-margin">
                            <li id="sign_up" className="pull-left medium-right-margin">
                                <a  href="#" onClick={this.signUp} className="link-reset">
                                    Sign Up
                                </a>
                            </li>
                            <li id="login" className="pull-left">
                                <a href="#" onClick={this.login} className="link-reset">
                                    Log In
                                </a>
                            </li>
                        </ul>
                    </div>
                    { this.state.login ? <Login /> : null }
                    { this.state.signup ? <SignUp /> : null }
                </div>
            );
        }
    });

    return Header;
});