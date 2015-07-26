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
var moment = require('moment');
var Notifications = require('./Notifications.jsx');
var UserMenu = require('./UserMenu.jsx');
var Calendar = require('../../pin/components/Calendar.jsx');
//var Modal = require('react-modal');
var ReactBootstrap = require('react-bootstrap');
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/*
Modal.setAppElement(document.getElementById('react'));
Modal.injectCSS();
*/
var Pins = React.createClass({

    getInitialState: function () {
        return {
            pins: {},
            homeClass: "",
            createClass: "",
            mapClass: "",
            showModal: false
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
                this.setState({pins: data});
            }.bind(this)
        });
    },

    // Go to pin page
    goToPin: function (pinId) {
        window.location.href = "/pin/" + pinId;
    },

    closeModal: function () {
        this.setState({showModal: false});
    },


    // Todo: Add like / comment in pin model + new thread / message model

    // Add a like
    like: function (pin, action) {
        var pinId = pin.id;

        console.log("item is " + action + "d ! " + pinId);
        console.log("action:  " + action);


        if (action === 'reserve') {
            // Display Calendar to select dates
            // Todo: Get pin availability
            var range = pin.range;

            if (range) {
                console.log("Pin range: " + range);

                if (moment.range instanceof Object) {
                    range = moment.range(range);

                    var dateRanges = [{
                        state: 'enquire',
                        range: range
                    }];
                } else {
                    var dateRanges = [];
                }

                // Todo: Display Calendar
                this.setState({
                    showModal: true,
                    dateRanges: dateRanges
                });
            }

        } else {
            $.ajax({
                //url: "/like/" + pinId,
                url: "/action/" + action + "/" + pinId,
                method: "POST",
                success: function (data) {
                    // Update count
                    //this.setState({pins: data});
                }.bind(this)
            });
        }
    },

    // Comment
    comment: function (pinId) {
        console.log("item is commented ! " + pinId);
        $.ajax({
            url: "/action/comment/" + pinId,
            method: "POST",
            success: function (data) {
                // Update count
                //this.setState({pins: data});
            }.bind(this)
        });
    },

    // Share
    share: function (pinId) {
        console.log("item is shared ! " + pinId);
        $.ajax({
            url: "/share/" + pinId,
            method: "POST",
            success: function (data) {
                // Update count
                //this.setState({pins: data});
            }.bind(this)
        });
    },

    reserve: function (pinId) {
        console.log("item is reserved ! " + pinId);
        $.ajax({
            url: "/reserve/" + pinId,
            method: "POST",
            success: function (data) {
                // Update count
                //this.setState({pins: data});
            }.bind(this)
        });
    },

    render: function () {

        var pins;
        var self = this;
        var imgSrc = "/bower_components/bootplus/docs/assets/img/cover" + randomIntFromInterval(1, 4) + ".jpg";

        var searchStyle = {
            "margin-top": "12px"
        };

        if (this.state.pins.length > 0) {

            pins = this.state.pins.reverse().map(function (pin, index) {
                console.debug("Pin" + index + " Info:" + JSON.stringify(pin));
                var image = <img src={imgSrc}/>;
                var path;
                if (pin.images) {
                    if (pin.images.length > 0) {
                        path = "../" + pin.images[0].path;
                        path.replace("/.tmp/public", "");
                        path.replace("\\.tmp\\public", "");
                        console.debug("Image path: " + path);
                        image = <img src={path}/>
                    }
                }

                var likeText = "Like";

                switch (pin.category.title) {
                    case 'Sharing':
                        likeText = "Reserve";
                        break;
                    default :
                        likeText = "Like";
                        break;
                }

                // Todo: add location information
                var link = "/pin/" + pin.id;

                var marginLeft = {
                    "margin-right": "5px;"
                };

                var published = moment(pin.createdAt).fromNow();

                var name = pin.user.firstName + " " + pin.user.lastName;

                return (
                    <div className="col-md-4 col-sm-6 item">
                        <div className="card">
                            <div className="card-heading image">
                                <img src={pin.user.avatar} alt=""/>

                                <div className="card-heading-header">
                                    <h3>{name}</h3>
                                    <span>{published}</span>
                                </div>
                            </div>
                            <div className="card-body">
                                <p>{pin.title}</p>

                                <p>{pin.description}</p>
                            </div>
                            <div className="card-media" onClick={self.goToPin.bind(self, pin.id)}>
                                <a className="card-media-container" href="#">
                                    {image}
                                </a>
                            </div>
                            <div className="card-actions">
                                <button className="btn" style={marginLeft}
                                        onClick={self.like.bind(self, pin, likeText.toLowerCase())}>{likeText}</button>
                                <button className="btn" style={marginLeft} onClick={self.comment.bind(self, pin.id)}>
                                    Comment
                                </button>
                                <button className="btn" onClick={self.share.bind(self, pin.id)}>Share</button>
                            </div>

                            <Modal show={self.state.showModal} onHide={self.closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Select Desired Date</Modal.Title>
                                </Modal.Header>
                                <button onClick={self.closeModal}>close</button>
                                <Modal.Body>
                                    <Calendar dateRanges={self.state.dateRanges} defaultState="unavailable"/>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button>Close</Button>
                                    <Button bsStyle='primary' onClick={self.reserve.bind(self, pin.id)}>Reserve</Button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                    </div>
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
                <div className="row masonry-container">
                    {pins}
                </div>
            </div>
        );
    }
});

module.exports = Pins;