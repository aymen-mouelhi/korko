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
var Showdown = require('showdown');
var $ = require('jquery');

var converter = new Showdown.converter();


var Category = React.createClass({

    render: function () {
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            <div className="category">
                <h2>
                    <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
                </h2>
                <PinCollection category={this.props.children.toString()} url='/pins' />
            </div>
        );
    }
}); //Category

var PinCollection = React.createClass({

    //could be optimized to render changes instead of pulling everything
    loadPins: function () {
        $.ajax({
            url: this.props.url,
            success: function (data) {
                this.setState({data: data.repos});
            }.bind(this)
        });
    },

    getInitialState: function () {
        return {data: []};
    },

    componentWillMount: function () {
        // Load Data from Server
        this.loadPins();
    },


    render: function () {
        var that = this;

        var pinNodes = this.state.data.map(function (repo, index) {

            var pin = repo.repo;
            var image = "http://netflix.github.io/assets/" + pin.metadata.boxArt;

            // Check Category
            if (that.props.category === pin.metadata.category) {
                return (
                    <Pin id={index} image={image} name={pin.name}></Pin>
                );
            }
        });
        return (
            <div>
          {pinNodes}
            </div>
        );
    }

}); //PinCollection

var Pin = React.createClass({

    mouseOver: function () {
        $('#cover_' + this.props.id).show();
        $('#button_' + this.props.id).show();
    },

    mouseOut: function () {

        $('#cover_' + this.props.id).hide();
        $('#button_' + this.props.id).hide();
    },


    render: function () {
        var pinId = "pin_" + this.props.id;
        var coverId = "cover_" + this.props.id;
        var buttonId = "button_" + this.props.id;

        var itemStyle = {
            "background-image": "url(" + this.props.image + ")"
        };

        return (
            <div id={pinId} className="repo-item-container" onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                <a className="standard-anchor" href="#">
                    <div className="repo-item-name">{this.props.name}</div>
                    <div className="repo-item" style={itemStyle}>
                        <div id={coverId} className="repo-item-cover">
                            <div className="repo-item-shadow"></div>
                        </div>
                        <div id={buttonId} className="repo-item-button"></div>
                    </div>
                </a>
            </div>

        );
    }
}); //Pin


var NotificationWrapper = React.createClass({

    render: function () {
        var none = {
            "display": "none"
        };


        return (
            <div className="notification-wrapper">
                <div id="notifications">
                    <a href="#" className="unread-count unlitCounter">
                        <span></span>
                    </a>
                    <div id="notification-firstTime" className="dropdown-menu">
                        <div className="inner1">
                            <div className="inner2">
                                <div className="notification-body">
                                    <span className="up-arrow"></span>
                                    <div className="firstTime-msg">
                                        <p className="firstTime-title">Vous avez des notifications&nbsp;!</p>
                                        <p className="firstTime-subtitle">
                                            Cliquez pour voir vos messages.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="notification-panel" className="dropdown-menu connect">
                        <div className="inner1">
                            <div className="inner2">
                                <span className="up-arrow"></span>
                                <div className="connect">
                                    <p className="title">Connectez-vous pour recevoir des recommandations privées de vos amis</p>
                                    <div className="connect-container">
                                        <div className="error-container">
                                            <p className="generic">Une erreur est survenue lors de la tentative de connexion à Facebook.</p>
                                            <div className="already-connected">
                                                Le compte Facebook que nous tentons de connecter est déjà utilisé par un autre compte Netflix.
                                                <button className="cta-fb-logout">
                                                    S'identifier avec un autre compte
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="notification-body">
                                    <span className="notification-title">Notifications</span>
                                    <div className="notification-container clearfix">
                                        <div className="spinning-loader" style={none}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
});

var SearchWrapper = React.createClass({

    render: function () {
        return (

            <div id="searchWrapper" className="showTab">
                <div id="searchTab" className="nav-item">
                    <a href="#">
                        <span className="searchSprite search-icon "></span>
                        <div className="content">Search</div>
                    </a>
                </div>

                <div id="global-search-form" className="productized">
                    <form action="http://www.netflix.com/WiSearch" id="global-search" name="search">
                        <div>
                            <input type="text" tabindex="1" id="searchField" placeholder="Titres, Personnes, Genres" name="v1" autocorrect="off" autocomplete="off" autocapitalize="off" />
                            <button type="submit" className="search-submit" name="search_submit" tabindex="2">Search</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});


var Account = React.createClass({
    render: function () {

        return (
            <div className="last notification2014 allow-hover">
                <div className="account-search">
                    <div id="account-tools">
                        <div className="account-tools">
                            <div id="profileSwitcher" className="i-b account-menu ">
                                <div id="profilesLauncher">
                                    <img src="https://pbs.twimg.com/profile_images/1879877721/aymen_200x200.png" className="profileImg i-b " title="Aymen" />
                                    <div className="acct-menu-dropdown-trigger i-b">Aymen</div>
                                </div>
                                <span className="down-arrow"></span>
                                <span className="down-arrow-shadow"></span>
                                <AccountActions />
                            </div>
                        </div>
                    </div>

                    <NotificationWrapper />
                    <SearchWrapper />
                </div>
            </div>
        );
    }
});

var AccountActions = React.createClass({

    addPin: function () {
        // Todo: Open Modal Box
        $(".modal-body").fadeIn(1000).html('<div style="text-align:center; margin-right:auto; margin-left:auto">Loading...</div>');
        $.ajax({
            type: "POST",
            data: {Id: Id},
            url: "",
            error: function (msg) {
                $(".modal-body").addClass("tableau_msg_erreur").fadeOut(800).fadeIn(800).fadeOut(400).fadeIn(400).html('<div style="margin-right:auto; margin-left:auto; text-align:center">Impossible de charger cette page</div>');
            },
            success: function (data) {
                $(".modal-body").fadeIn(1000).html(data);
            }
        });
    },

    render: function () {

        var pointer = {
            "cursor": "pointer"
        };

        var block = {
            "display": "block"
        };

        return (
            <div id="profiles-menu" className="dropdown-menu dropdown-profiles">
                <div className="inner1">
                    <div className="inner2">
                        <div className="profiles-menuBody">
                            <span className="up-arrow"></span>

                            <ul className="clearfix">
                                <li className="profileData" style={pointer}>
                                    <a href="/switchProfile?profile=2">
                                        <div className="i-b shim"></div>
                                        <img src="https://pbs.twimg.com/profile_images/3545002921/8290e27287bbd38321b8859a53c0a4a2.jpeg" className="profileImg i-b" />
                                        <div className="profileName i-b">Mister Pizza</div>
                                    </a>
                                </li>

                                <li className="profileData profileTemplate" id="profileTemplate" style={pointer}>
                                    <a href="" data-guid="" data-img="" data-kids="" data-firstuse="" data-accountowner="" onclick="return false;">
                                        <div className="i-b shim"></div>
                                        <img src="" className="profileImg i-b" />
                                        <div className="profileName i-b"></div>
                                    </a>
                                </li>

                                <li className="manage">
                                    <a href="/profiles">
                                        <div className="i-b shim"></div>
                                        <div className="i-b">Manage my profiles</div>
                                    </a>
                                </li>
                            </ul>

                            <div className="link">
                                <a href="/pin/create" target="_top">Add a new Pin</a>
                            </div>

                            <div className="link">
                                <a href="/categories" target="_top">Browse</a>
                            </div>
                            <div className="link">
                                <a href="/account" target="_top">My Account</a>
                            </div>
                            <div className="link">
                                <a href="/help" target="_top">Help</a>
                            </div>
                            <div className="link" id="signout">
                                <a href="/signout" target="_top">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


var Header = React.createClass({
    render: function () {
        return (
            <div id="non-scrolling-section">
                <div className="header">
                    <div className="header-logo">
                        <a href="#">
                            <img src="http://netflix.github.io/assets/netflix-oss-logo-new.png" align="middle" alt="Korko" border="0" />
                        </a>
                        <div className="header-text">Korko</div>
                    </div>
                </div>
            </div>
        );
    }
});


var NetflixHeader = React.createClass({
    render: function () {

        var customLogo = {
            "background-image": "url(/images/korko.png)"
        };

        return (
            <div className="svfDoc">
                <div className="contentWrap2014">

                    <div id="hd" className="darkText headerShadow">
                        <div className="logo">
                            <a href="http://www.netflix.com/WiHome" style={customLogo}>Korko</a>
                        </div>

                        <div className="nav-wrap">
                            <ul id="global-header" className="global-header-wrap i-b notDvdOnly">
                                <li id="nav-edgenre" className="nav-genres nav-item">
                                    <span className="i-b content">
                                        <a href="/map/app">Map</a>
                                        <span className="right-arrow"></span>
                                    </span>

                                    <span className="i-b shim"></span>
                                    <span className="up-arrow"></span>
                                    <span className="down-arrow"></span>
                                    <span className="down-arrow-shadow"></span>
                                </li>

                            </ul>
                        </div>

                        <Account />

                    </div>
                </div>
            </div>
        );
    }
});


var Dashboard = React.createClass({

    //could be optimized to render changes instead of pulling everything
    loadCategories: function () {
        var data = [{
            text: "Cloud Management"
        }, {
            text: "Availability"
        }, {
            text: "Persistence Systems"
        },
            {
                text: "Platform Libraries"
            },
            {
                text: "Infrastructure Services"
            },
            {
                text: "Developer Productivity"
            },
            {
                text: "Build and Deploy Tools"
            },
            {
                text: "Big Data Tools"
            },
            {
                text: "In-Memory Data Management"
            },
            {
                text: "Security"
            },
            {
                text: "Sample Applications and Recipes"
            },
            {
                text: "Uncategorized"
            }
        ];


        /*
         $.ajax({
         url: this.props.url,
         success: function(data) {
         this.setState({data: data});
         }.bind(this)
         });
         */

        data.sort(function (a, b) {
            if (a.text < b.text) return -1;
            if (a.text > b.text) return 1;
            return 0;
        });

        this.setState({data: data});
    },

    getInitialState: function () {
        return {data: this.props.data};
    },

    componentWillMount: function () {
        // Load Data from Server
        this.loadCategories();
    },

    render: function () {
        //var categoryNodes = this.state.data.reverse().map(function (category, index) {
        var categoryNodes = this.state.data.map(function (category, index) {
            return (
                <Category>
            {category.text}
                </Category>);
        });


        var margin = {
            "margin-top": "100px"
        };


        return (
            <div>
                <NetflixHeader/>
                <div id="scrolling-section">
                    <div id="tab-content-repo">
                        <div id="content-left">
                            <div id="repo-heading" style={margin}>
                                <a href="#">
                                    <h2>Trending Pins</h2>
                                </a>
                            </div>
                            <div id="repo-content">
            {categoryNodes}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Dashboard;
