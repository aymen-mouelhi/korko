// var Select = require('react-select');

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
var Bootstrap = require('react-bootstrap');
var Header = require('../../dashboard/components/Header.jsx');
var Map = require('../../neighborhood/components/Map.jsx');
var Calendar = require('./Calendar.jsx');

var button = Bootstrap.button;

// Todo: Remove LoadCategory, location, user ..


var PinForm = React.createClass({

    getInitialState: function () {
        var pin = JSON.parse(this.props.pin);
        return {
            pin: pin,
            location: {},
            category: {},
            showCalendar: false
        }
    },

    componentWillMount: function () {
        this.loadCategory(this.state.pin.category);
    },


    componentDidMount: function () {
        console.info("React props: " + this.props.pin);
    },

    loadCategory: function (categoryId) {
        // Todo: Performance Issue => populate directly from server
        $.ajax({
            url: "/category/" + categoryId,
            success: function (data) {
                this.setState({category: data});
                if (data) {
                    // check category
                    if (data.title.indexOf('Sharing') > -1) {
                        // Display Calendar
                        this.setState({showCalendar: true});
                    } else {
                        // Hide Calendar
                        this.setState({showCalendar: false});
                    }
                }
            }.bind(this)
        });
    },

    submit: function (event) {
        event.preventDefault();

        var data = {
            title: $("#title").val(),
            description: $("#description").val(),
            category: $("#category").children(":selected").attr("id"),
            location: JSON.stringify(window.selectedLocation)
        };

        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }

        // send data
        ajax.send("/pin/create", "POST", query.join('&'), true, function (data) {
            // now upload images ! /pin/:id
            var pinId = JSON.parse(data).id;
            Dropzone.options.url = "/pin/" + pinId;
            Dropzone.processQueue();
        });
    },

    render: function () {
        var images;
        if (this.state.pin.images) {
            if (this.state.pin.images.length > 0) {
                images = this.state.pin.images.map(function (image, index) {
                    var path = "../" + image.path;
                    return (
                        <div className="col-xs-6 col-md-3">
                            <a href="#" className="thumbnail">
                                <img src={path}/>
                            </a>
                        </div>
                    );
                });
            }
        }

        var page = "create";
        var range;
        var dateRanges = [];

        if (this.state.pin.range) {
            range = moment.range(this.state.pin.range);

            dateRanges = [{
                    state: 'enquire',
                    range: range
                }];
        }

        return (
            <div className="block">

                <Header page={page}/>

                <form id="create" role="form">

                    <div className="form-group">
                        <label for="title">Title</label>

                        <p id="title" class="form-control-static">{this.state.pin.title}</p>
                    </div>

                    <div className="form-group">
                        <label for="description">Description</label>

                        <p id="description" class="form-control-static">{this.state.pin.description}</p>
                    </div>

                    <div className="form-group">
                        <label for="category">Category</label>

                        <p id="category" class="form-control-static">{this.state.category.title}</p>
                    </div>

                    <div className="form-group">
                        <label for="price">Price</label>

                        <p id="category" class="form-control-static">{this.state.category.price}</p>
                    </div>

                    { this.state.showCalendar ? <Calendar dateRanges={dateRanges} defaultState="unavailable"/> : null }

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Location</h3>
                        </div>
                        <div className="wrapper">
                            <div className="panel-body" id="map-container">
                                <Map page="pin" location={this.state.pin.location} showRemove={false}/>
                            </div>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Pictures</h3>
                        </div>
                        <div className="panel-body">
                            {images}
                        </div>
                    </div>

                </form>
            </div>
        );
    }
});

module.exports = PinForm;