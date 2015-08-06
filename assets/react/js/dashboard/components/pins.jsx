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

var PinCard = require('./PinCard.jsx');



var Pins = React.createClass({

    getInitialState: function () {
        return {
            pins: {},
            homeClass: "",
            createClass: "",
            mapClass: ""
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

    },

    // Load Pins
    getPins: function () {

        var url = "";

        if (!this.props.url) {
            url = "/pin";
        } else {
            url = this.props.url;
        }

        $.ajax({
            url: url,
            success: function (data) {
                this.setState({pins: data.reverse()});
            }.bind(this)
        });
    },

    render: function () {

        var pins;
        var self = this;


        var fixedMargin = {
            "margin-left": "-16px"
        };

        if (this.state.pins.length > 0) {

            pins = this.state.pins.map(function (pin, index) {
                //console.debug("Pin" + index + " Info:" + JSON.stringify(pin))
                return (
                    <PinCard pin={pin} key={pin.id}/>
                );
            });
        }
        return (

            <div>
                <div className="row masonry-container" style={fixedMargin}>
                    {pins}
                </div>
            </div>

        );
    }
});

module.exports = Pins;