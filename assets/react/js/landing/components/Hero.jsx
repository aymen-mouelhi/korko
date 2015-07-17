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

var Hero = React.createClass({

    render: function () {
        return (
            <div className= "p1-hero-wrapper shift-with-hiw js-p1-hero" >
                {/* Video Background*/}
                <div id="hero">

                    {/* Video Background
                     <video autoPlay="true" preload="auto" loop="loop" id="pretzel-video" className="video-playing">
                     <source src="https://a0.muscache.com/airbnb/static/London-P1-1.mp4" type="video/mp4" />
                     <source src="https://a0.muscache.com/airbnb/static/London-P1-0.webm" type="video/webm" />
                     </video>
                     */}

                    <img src="https://drscdn.500px.org/photo/108016165/m%3D2048/03015752bba7af6a710317a0f7b679fc" width="100%" />
                </div>

                {/* Hero Description */}
                <div className="search-area text-center">
                    <div className="va-container va-container-v va-container-h">
                        <div className="intro-area va-middle">
                            <h1 id="tagline" className="uppercase text-jumbo text-contrast row-space-1">
                                Welcome home
                            </h1>
                            <div id="subtitle" className="h4 text-contrast row-space-4">
                                Meet, Share and Help
                            </div>

                            <a href="#" className="btn hide-sm btn-contrast btn-large btn-semi-transparent how-it-works">
                                How It Works
                            </a>

                            {/* Search Form */}

                            <div className="p1-hero-search-form hide-sm">
                                <div className="col-12">
                                    <form id="search_form" method="get">
                                        <div className="search-form-input-wrapper">
                                            <div className="location-wrapper">
                                                    <span className="input-placeholder-group">
                                                        <input type="text" className="form-inline location input-large input-contrast" aria-autocomplete="both" aria-owns="menu-1" autocomplete="off" value="" placeholder="Search by city, address, landmark..." name="location" id="location" />
                                                    </span>
                                                <p id="enter_location_error_message" className="bad hide">Please set location</p>
                                            </div>

                                            {/*
                                             <span className="input-placeholder-group">
                                             <input type="text" id="checkin" className="form-inline checkin search-option input-large input-contrast input-underline ui-datepicker-target" name="checkin" placeholder="Check In"/>
                                             </span>
                                             <span className="input-placeholder-group" >
                                             <input type="text" id="checkout" className="form-inline checkout search-option input-large input-contrast input-underline ui-datepicker-target" name="checkout" placeholder="Check Out"/>
                                             </span>
                                             <div className="select select-large">
                                             <select id="guests" name="guests">
                                             <option value="1">1 Guest</option>
                                             <option value="2">2 Guests</option>
                                             <option value="3">3 Guests</option>
                                             <option value="4">4 Guests</option>
                                             <option value="5">5 Guests</option>
                                             <option value="6">6 Guests</option>
                                             <option value="7">7 Guests</option>
                                             <option value="8">8 Guests</option>
                                             <option value="9">9 Guests</option>
                                             <option value="10">10 Guests</option>
                                             <option value="11">11 Guests</option>
                                             <option value="12">12 Guests</option>
                                             <option value="13">13 Guests</option>
                                             <option value="14">14 Guests</option>
                                             <option value="15">15 Guests</option>
                                             <option value="16">16+ Guests</option>
                                             </select>
                                             </div>
                                             <div className="menu hide hide" id="menu-1" aria-expanded="false" aria-role="listbox">
                                             <div className="menu-section"></div>
                                             </div>
                                             */}

                                        </div>

                                        <button type="submit" className="search-button form-inline btn btn-primary btn-large" id="submit_location" >Search</button>
                                    </form>
                                </div>
                            </div>

                            {/* End Search Form */}


                        </div>

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Hero;