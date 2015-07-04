/**
 * Created by Aymen Mouelhi (aymen.mouelhi) on 24/05/2015.
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
define(['react', 'react-bootstrap', 'dashboard/Header', 'neighborhood/Map', 'validator', 'local-app/Calendar'],
    function (React, Bootstrap, Header, Map, Validator, Calendar) {
    'use strict';

    /*
     var Navbar = Bootsrap.Navbar;
     var CollapsibleNav = Bootsrap.CollapsibleNav;
     var Nav = Bootsrap.Nav;
     var NavItem = Bootsrap.NavItem;
     */

    var button = Bootstrap.button;

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

    var Dropzone;

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
            // Resize map to fix issue regarind grey area
            Map.resizeMap();

            Dropzone = new window.Dropzone("div#images-dropzone", {
                    url: "/file/post",
                    paramName: "image", // The name that will be used to transfer the file
                    maxFilesize: 2, // MB
                    autoProcessQueue: false,
                    accept: function (file, done) {
                        if (file.name == "justinbieber.jpg") {
                            done("Naha, you don't.");
                        }
                        else {
                            done();
                        }
                    }
                }
            );

            // Enable Form Validation
            $('#create').validator();
        },

        submit: function (event) {

            var self = this;
            event.preventDefault();

            // Todo: better form validation

            if ($("#title").val() != "" && window.selectedLocation != {}) {
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
                    Dropzone.on('complete', function (file) {
                        // Upload is now completed
                        self.showSuccessMessage();
                    });
                });
            }
        },

        showSuccessMessage: function () {
            var message = '<div class="alert alert-success">Pin created successfully !</div>';
            $('#create').before(message);
            // Todo: Redirect To home Page
            setTimeout(function () {
                window.location.replace("/");
            }, 2000);
        },

        changeCategory: function () {
            var categoryId = $("#category").children(":selected").attr("id");
            var category = $("#category").children(":selected").attr("value");

            console.debug("Selected Category: " + $("#category").children(":selected").attr("value"));

            if (category.indexOf('Sharing') > -1) {
                // Todo Display Calendar

            }

        },

        render: function () {
            var selectOptions;
            if (this.state.categories.length) {
                selectOptions = this.state.categories.map(function (category, index) {
                    // Check Category
                    return (
                        <option id={category.id} value={category.title}>{category.title}</option>
                    );
                });
            } else {
                selectOptions = <option id="0">no categories found</option>
            }

            return (
                <div className="block">
                    <Header />

                    <Calendar />

                    <form id="create" role="form">
                        <legend>Create New Pin</legend>

                        <div className="form-group">
                            <label for="title">Title</label>
                            <input id="title" type="text" name="title" placeholder="title ..." autofocus="true" className="form-control" required />
                        </div>

                        <div className="form-group">
                            <label for="description">Description</label>
                            <input id="description" type="text" name="description" placeholder="description ..." autofocus="true" className="form-control" required />
                        </div>

                        <div className="form-group">
                            <label for="category">Category</label>
                            <select id="category" className="form-control" onChange={this.changeCategory}>
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
                            <div id="images-dropzone" className="dropzone dz-clickable"></div>
                        </div>

                        <button type="submit" onClick={this.submit} className="btn btn-primary">Create</button>

                    </form>

                </div>
            );
        }
    });

    return PinForm;
});