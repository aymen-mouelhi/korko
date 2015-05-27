/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 27/05/2015.
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'jquery', 'imagesloaded', 'masonry', 'moment'], function (React, $, imagesLoaded, masonry, moment) {
    'use strict';

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var Pins = React.createClass({

        getInitialState: function () {
            // Todo: remove user name
            return {
                pins: {},
                user: {},
                name: "",
                picture: ""
            }
        },


        componentWillMount: function () {
            this.getRandomUserImage();
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

        getRandomUserImage: function () {
            $.ajax({
                url: 'http://api.randomuser.me/',
                dataType: 'json',
                success: function (data) {
                    //console.log("User Data: " + JSON.stringify(data));
                    var name = data.results[0].user.name.first + " " + data.results[0].user.name.last;
                    this.setState({
                        user: data.results[0].user,
                        name: name,
                        picture: data.results[0].user.picture.thumbnail
                    });
                    // load pins
                    this.getPins();
                }.bind(this)
            });
        },

        // Load Pins
        getPins: function () {
            $.ajax({
                url: "/pin",
                success: function (data) {
                    this.setState({pins: data});
                    console.log("User Name: " + this.state.name);
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
        },

        // Comment
        comment: function (pinId) {
            console.log("item is commented ! " + pinId);
        },

        // Share
        share: function (pinId) {
            console.log("item is shared ! " + pinId);
        },

        render: function () {

            var pins;
            var self = this;

            var name = "";

            var imgSrc = "/bower_components/bootplus/docs/assets/img/cover" + randomIntFromInterval(1, 4) + ".jpg";

            if (this.state.pins.length > 0) {

                pins = this.state.pins.map(function (pin, index) {
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

                    return (
                        <div className="col-md-4 col-sm-6 item" >
                            <div className="card">
                                <div className="card-heading image">
                                    <img src={self.state.picture} alt=""/>
                                    <div className="card-heading-header">
                                        <h3>{self.state.name}</h3>
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
                <div className="row masonry-container">
                {pins}
                </div>
            );
        }
    });

    return Pins;
});