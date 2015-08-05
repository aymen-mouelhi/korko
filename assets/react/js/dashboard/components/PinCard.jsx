/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 26/07/2015.
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
var moment = require('moment');
require('moment-range');
var Calendar = require('../../pin/components/Calendar.jsx');
//var Modal = require('react-modal');
var ReactBootstrap = require('react-bootstrap');
var eventEmitter = require('central-event');
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/*
 Modal.setAppElement(document.getElementById('react'));
 Modal.injectCSS();
 */

var PinCard = React.createClass({

    getInitialState: function () {
        return {
            showModal: false
        }
    },

    componentDidMount: function () {
        console.log("Pin Card loaded for :" + this.props.pin.id);

        var self = this;

        // Listen for range updates
        eventEmitter.on('rangeUpdated', function (range) {
            console.debug("Selected range in App.jsx: " + range);
            console.debug("Selected range in App.jsx: " + range.toString());

            // Todo: Post reservation
            //self.reserve(self.props.pin.id, range);

            self.setState({range: range});

        });
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
                    dateRanges: dateRanges,
                    showModal: true,
                    range: null
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
        var range = this.state.range;

        if(range){
            console.log("Needed Range: " + range);

            $.ajax({
                url: "/action/reserve/" + pinId,
                method: "POST",
                success: function (data) {
                    // Update count
                    //this.setState({pins: data});
                    console.log("item is reserved ! " + pinId);
                }.bind(this)
            });
        }else{
            // Todo: show error message + don't close modal
            console.debug("Range not selected!")
            this.setState({
                showModal: true
            });
        }

    },

    // Go to pin page
    goToPin: function (pinId) {
        window.location.href = "/pin/" + pinId;
    },

    render: function () {

        var imgSrc = "/bower_components/bootplus/docs/assets/img/cover" + randomIntFromInterval(1, 4) + ".jpg";
        var image = <img src={imgSrc}/>;

        var path;
        if (this.props.pin.images) {
            if (this.props.pin.images.length > 0) {
                path = "../" + this.props.pin.images[0].path;
                path.replace("/.tmp/public", "");
                path.replace("\\.tmp\\public", "");
                console.debug("Image path: " + path);
                image = <img src={path}/>
            }
        }

        var likeText = "Like";

        switch (this.props.pin.category.title) {
            case 'Sharing':
                if (!this.props.pin.isMine) {
                    likeText = "Reserve";
                } else {
                    likeText = "Like";
                }
                break;
            default :
                likeText = "Like";
                break;
        }

        // Todo: add location information
        var link = "/pin/" + this.props.pin.id;

        var marginLeft = {
            "margin-right": "5px;"
        };

        var cardWidth = {
            "width": "600px"
        };

        var itemWidth = {
            "width": "60%"
        };

        var noShadow = {
            "-webkit-box-shadow": "none;",
            "-moz-box-shadow": "none;",
            "box-shadow": "none;",
            "width":"auto"
        };

        var published = moment(this.props.pin.createdAt).fromNow();

        var name = this.props.pin.user.firstName + " " + this.props.pin.user.lastName;

        return (
            <div className="col-md-4 col-sm-6 item" key={this.props.pin.id} style={itemWidth}>
                <div className="card">
                    <div className="card-heading image">
                        <img src={this.props.pin.user.avatar} alt=""/>

                        <div className="card-heading-header">
                            <h3>{name}</h3>
                            <span>{published}</span>
                        </div>
                    </div>
                    <div className="card-body" onClick={this.goToPin.bind(this, this.props.pin.id)}>
                        <p>{this.props.pin.title}</p>

                        <p>{this.props.pin.description}</p>
                    </div>
                    <div className="card-media">
                        <a className="card-media-container" href="#">
                            {image}
                        </a>
                    </div>
                    <div className="card-actions">
                        <button className="btn" style={marginLeft}
                                onClick={this.like.bind(this, this.props.pin, likeText.toLowerCase())}>{likeText}</button>
                        <button className="btn" style={marginLeft} onClick={this.comment.bind(this, this.props.pin.id)}>
                            Comment
                        </button>
                        <button className="btn" onClick={this.share.bind(this, this.props.pin.id)}>Share</button>
                    </div>

                    {
                        <Modal show={this.state.showModal} onHide={this.closeModal} style={noShadow}>
                            <Modal.Header closeButton>
                                <Modal.Title>Select Desired Date</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Calendar dateRanges={this.state.dateRanges} defaultState="unavailable"/>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button>Close</Button>
                                <Button bsStyle='primary'
                                        onClick={this.reserve.bind(this, this.props.pin.id)}>Reserve</Button>
                            </Modal.Footer>
                        </Modal>
                    }
                </div>
            </div>
        );
    }
});

module.exports = PinCard;