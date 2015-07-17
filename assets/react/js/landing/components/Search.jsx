/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 17/07/2015.
 */
/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
var React = require('react');

var Search = React.createClass({

    render: function () {
        return (
            <div>
                <form id="search_form" method="get">
                    <div className="search-form-input-wrapper">
                        <div className="location-wrapper">
                            <input type="text" className="form-inline location input-large input-contrast" aria-activedescendant="null" aria-autocomplete="both" aria-owns="menu-1" autoComplete="off" defaultValue placeholder="Search by city, address, landmark..." name="location" id="location">
                                    <span className="input-placeholder-group">
                                        <input type="text" className="form-inline location input-large input-contrast" aria-activedescendant="null" aria-autocomplete="both" aria-owns="menu-1" autoComplete="off" defaultValue placeholder="Search by city, address, landmark..." name="location" id="location"></input>
                                    </span>
                            </input>
                            <p id="enter_location_error_message" className="bad hide">Please set location</p>
                        </div>
                    </div>
                    <input type="hidden" name="source" value="bb"/>
                    <button type="submit" className="search-button form-inline btn btn-primary btn-large" id="submit_location">Search</button>
                </form>
            </div>
        );
    }
});

module.exports = Search;
