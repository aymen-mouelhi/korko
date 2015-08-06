/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 06/08/2015.
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
var Bootstrap = require('react-bootstrap');
var TabbedArea = Bootstrap.TabbedArea;
var TabPane = Bootstrap.TabPane;
var Pins = require('../../dashboard/components/pins.jsx');
var Map = require('../../neighborhood/components/Map.jsx');

var Profile = React.createClass({


    getInitialState() {
        return {
            key: 1,
            showPins: false,
            showNeighborhood: false,
            neighborhood: {}
        };
    },

    componentWillMount: function () {
        this.getCurrentUser();
    },

    /**
     * Get current user
     */
    getCurrentUser: function () {
        // Todo: get user id from
        $.ajax({
            url: "/me",
            success: function (data) {
                if(data.neighborhoods){
                    this.setState({neighborhood: data.neighborhoods[0]});
                }

            }.bind(this)
        });
    },

    handleSelect(key) {
        switch (key) {
            case 1:
                this.setState({
                    key: key,
                    showPins: false,
                    showNeighborhood: false
                });
                break;
            case 2:
                this.setState({
                    key: key,
                    showPins: true,
                    showNeighborhood: false
                });
                break;
            case 3:
                this.setState({
                    key: key,
                    showPins: false,
                    showNeighborhood: true
                });
                break;
            default:
                this.setState({
                    key: key,
                    showPins: false,
                    showNeighborhood: false
                });
                break;
        }
    },

    render: function () {

        var marginAuto = {
            "margin": "0px auto;"
        };

        var margin10 = {
            "margin": "10px;"
        };

        var pin = {
            "margin-left": "10px;",
            "background": "#e9eaed"
        };

        return (
            <div className="container" style={marginAuto}>
                <div className="profile-image">
                    <img className="img-rounded slide img-responsive" src="http://s9.postimg.org/41fwo4k4v/pro.png"/>
                    <img className="img-thumbnail personal-pic img-responsive" src="http://s10.postimg.org/rqhogyy3p/image.png"/>
                </div>
                <div className="w925px person-info">
                    <div className="panel panel-default">
                        <div className="panel-body">
                            <TabbedArea activeKey={this.state.key} onSelect={this.handleSelect}>
                                <TabPane eventKey={1} tab='Home'>Home View</TabPane>
                                <TabPane eventKey={2} tab='My Pins' style={pin}>
                                    { this.state.showPins ? <Pins url="/me/pins"/> : null }
                                </TabPane>
                                <TabPane eventKey={3} tab='My Neighborhood' style={pin}>
                                    <div id="map-container">
                                    { this.state.showNeighborhood ? <Map location={this.state.neighborhood.location} showRemove={true}/> : null }
                                    </div>
                                </TabPane>
                                <TabPane eventKey={4} tab='My neighbours' disabled>TabPane 3 content</TabPane>
                            </TabbedArea>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Profile;