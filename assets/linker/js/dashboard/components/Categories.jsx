/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'showdown', 'jquery'], function (React, Showdown, $) {
    'use strict';

    var converter = new Showdown.converter();

    // Todo: Loop over categories

    var Category = React.createClass({

        render: function () {
            var rawMarkup = converter.makeHtml(this.props.children.toString());
            return (
                <div className="category">
                    <h2>
                        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
                    </h2>
                    <PinCollection category={this.props.children.toString()} url='/repos' />
                </div>
            );
        }
    }); //Category

    var PinCollection = React.createClass({

        //could be optimized to render changes instead of pulling everything
        loadPins: function () {
            // Todo: Load Data from Server
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
                // Todo: Change this with correct object
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

            // Todo: Load Data from Server
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
                "margin-top" : "100px"
            };


            return (
                <div>
                    <Header/>
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

    return Dashboard;
});
