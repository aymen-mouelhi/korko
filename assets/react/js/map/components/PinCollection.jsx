/**
 * @jsx React.DOM
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

    var PinCollection = React.createClass({
        getInitialState: function () {
            return {
                loading: false,
                canLoadMore: true,
                lastLoadedPage: 0,
                pins: {},
                error: false,
                xhr: null
            }
        },

        componentWillMount: function () {
            this.load()
        },

        componentDidUpdate: function (oprops, ostate) {

        },

        componentDidMount: function () {
            var $container = $('.masonry-container');

            imagesLoaded(".masonry-container", function () {
                masonry(".masonry-container", {
                    columnWidth: '.item',
                    itemSelector: '.item'
                });
            });
        },

        // data loading
        load: function () {
            console.info("loading content");
            if (this.state.xhr) {
                this.state.xhr.abort()
            }
            if (!this.state.canLoadMore) {
                return console.error('Got a request to load more, but there was no more')
            }
            // Todo: send current user location
            var url = '/pin';
            var xhr = $.get(url, this.gotData, 'json').fail(this.failed);
            this.setState({error: false, loading: true, xhr: xhr});
        },

        gotData: function (data) {

            var canLoadMore = data.length === 30;
            this.setState({
                loading: false,
                lastLoadedPage: this.state.lastLoadedPage + 1,
                canLoadMore: canLoadMore,
                pins: data,
                error: false,
                xhr: null
            });

            if (canLoadMore) {
                this.load();
            }
        },

        failed: function (xhr, status, reason) {
            this.setState({error: reason || true});
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

        /*
         render: function () {

         var pinsArray = new Array();

         for (var i in this.state.pins) {
         var pin = this.state.pins[i];
         pinsArray.push(pin);
         }

         var pinNodes = pinsArray.map(function (pin) {
         return (
         <div className="pin">
         <img src={pin.image} />
         <p>
         {pin.text}
         </p>
         </div>
         );
         });

         return (
         <div id="wrapper">
         <div id="columns">
         <div>
         {pinNodes}
         </div>
         </div>
         </div>
         );
         }
         */

        render: function () {

            var pins;
            var self = this;
            var imgSrc = "/bower_components/bootplus/docs/assets/img/cover" + randomIntFromInterval(1, 4) + ".jpg";

            var searchStyle = {
                "margin-top": "12px"
            };

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
                    <div className="row masonry-container">
                        {pins}
                    </div>
                </div>
            );
        }

    });

    return PinCollection;

});