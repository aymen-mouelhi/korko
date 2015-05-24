/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 24/05/2015.
 */

// var Select = require('react-select');

/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'react-bootstrap', 'neighborhood/Map'], function (React, Bootsrap, Map) {
    'use strict';

    /*
     var Navbar = Bootsrap.Navbar;
     var CollapsibleNav = Bootsrap.CollapsibleNav;
     var Nav = Bootsrap.Nav;
     var NavItem = Bootsrap.NavItem;
     */

    var button = Bootsrap.button;

    var options = [
        {value: 'one', label: 'One'},
        {value: 'two', label: 'Two'}
    ];

    function logChange(val) {
        console.log("Selected: " + val);
    }

    // Todo: Define a new RequireJS Module: Ajax / use jQuery
    // Ajax Request without jquery
    var ajax = {};
    ajax.x = function () {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for (var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {
            }
        }
        return xhr;
    };

    ajax.send = function (url, method, data, sync, callback) {
        var x = ajax.x();
        x.open(method, url, sync);
        x.onreadystatechange = function () {
            if (x.readyState == 4) {
                callback(x.responseText)
            }
        };

        if (method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }

        x.send(data);
    };


    var PinForm = React.createClass({

        getInitialState: function () {
            return {
                categories: {},
                error: false,
                xhr: null
            }
        },

        componentWillMount: function () {
            this.load()
        },

        // data loading
        load: function () {
            console.info("loading content");
            if (this.state.xhr) {
                this.state.xhr.abort()
            }
            var url = '/category';
            var xhr = $.get(url, this.gotData, 'json').fail(this.failed);
            this.setState({error: false, loading: true, xhr: xhr});
        },

        gotData: function (data) {
            this.setState({
                categories: data,
                error: false,
                xhr: null
            });
        },

        failed: function (xhr, status, reason) {
            this.setState({error: reason || true});
        },

        componentDidMount: function () {
        },

        submit: function (event) {
            console.info("Handler for .submit() called.");
            event.preventDefault();


            var data = {
                title: $("#title").val(),
                description: $("#description").val(),
                category: $("#category").val(),
                location: JSON.stringify(window.selectedLocation)
            };

            var query = [];
            for (var key in data) {
                query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }

            ajax.send("/pin/create", "POST", query.join('&'), true, function () {

            });
        },

        render: function () {
            var selectOptions;
            if (this.state.categories.length) {
                selectOptions = this.state.categories.map(function (category, index) {
                    // Check Category
                    return (
                        <option id={index}>{category.name}</option>
                    );
                });
            } else {
                selectOptions = <option id="0">no categories found</option>
            }

            return (
                <div className="block">
                    <form id="create">
                        <legend>Create new Pin</legend>

                        <div className="form-group">
                            <label for="title">Title</label>
                            <input id="title" type="text" name="title" placeholder="title ..." autofocus="true" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label for="description">Description</label>
                            <input id="description" type="text" name="description" placeholder="description ..." autofocus="true" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label for="category">Category</label>
                            <select id="category" className="form-control">
                            {selectOptions}
                            </select>
                        </div>

                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Location</h3>
                            </div>
                            <div className="panel-body" id="map-container">
                                <Map page="pin" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label for="category">Images</label>
                            <div id="dropzone" className="dropzone dz-clickable"></div>
                        </div>

                        <button type="submit" onClick={this.submit} className="btn btn-primary">Create</button>

                    </form>
                </div>
            );
        }
    });

    return PinForm;
});