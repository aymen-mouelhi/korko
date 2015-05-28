/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 27/05/2015.
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'jquery', 'imagesloaded', 'masonry', 'moment', 'app/Header'], function (React, $, imagesLoaded, masonry, moment, Header) {
    'use strict';

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var Pins = React.createClass({

        getInitialState: function () {
            return {
                pins: {}
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
            })

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


        // Todo: Add like / comment in pin model + new thread / message model

        // Add a like
        like: function (pinId) {
            console.log("item is liked ! " + pinId);

            $.ajax({
                url: "/like/" + pinId,
                method: "POST",
                success: function (data) {
                    // Update count
                    //this.setState({pins: data});
                }.bind(this)
            });
        },

        // Comment
        comment: function (pinId) {
            console.log("item is commented ! " + pinId);
            $.ajax({
                url: "/comment/" + pinId,
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

        render: function () {

            var pins;
            var self = this;
            var imgSrc = "/bower_components/bootplus/docs/assets/img/cover" + randomIntFromInterval(1, 4) + ".jpg";

            if (this.state.pins.length > 0) {

                pins = this.state.pins.reverse().map(function (pin, index) {
                    var image = <img src={imgSrc} />;
                    var path;
                    if (pin.images) {
                        if (pin.images.length > 0) {
                            path = "../" + pin.images[0].path;
                            image = <img src={path} />
                        }
                    }

                    // Todo: add location information
                    var link = "/pin/" + pin.id;

                    var marginLeft = {
                        "margin-right": "5px;"
                    };

                    var published = moment(pin.createdAt).fromNow();

                    var name = pin.user.firstName + " " + pin.user.lastName;

                    return (
                        <div className="col-md-4 col-sm-6 item" >
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
                                    <button className="btn" style={marginLeft} onClick={self.like.bind(self, pin.id)}>Like</button>
                                    <button className="btn" style={marginLeft} onClick={self.comment.bind(self, pin.id)}>Comment</button>
                                    <button className="btn" onClick={self.share.bind(self, pin.id)}>Share</button>
                                </div>
                            </div>
                        </div>
                    );
                });
            }
            return (
                <div>
                    <Header />
                    <div className="row masonry-container">
                {pins}
                    </div>
                </div>
            );
        }
    });

    return Pins;
});