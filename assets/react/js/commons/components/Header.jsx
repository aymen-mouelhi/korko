/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['../../../../bower_components/react/react'], function (React) {
    'use strict';


    var Header = React.createClass({
        render: function () {
            return (
                <div className="svfDoc">
                    <div className="contentWrap2014">

                        <div id="hd" className="darkText headerShadow">
                            <div className="logo">
                                <a href="http://www.netflix.com/WiHome">Korko</a>
                            </div>

                            <div className="nav-wrap">
                                <ul id="global-header" className="global-header-wrap i-b notDvdOnly">
                                    <li id="nav-edgenre" className="globalConsistency nav-genres nav-item dropdown-trigger">
                                        <span className="i-b content">
                                            <a href="http://www.netflix.com/WiHome?lnkctr=mhWN">Parcourir</a>
                                            <span className="right-arrow"></span>
                                        </span>

                                        <span className="i-b shim"></span>
                                        <span className="up-arrow"></span>
                                        <span className="down-arrow"></span>
                                        <span className="down-arrow-shadow"></span>
                                    </li>


                                    <li id="rTab" className="nav-item-large nav-item">
                                        <span className="i-b content">
                                            <a href="http://www.netflix.com/RateMovies">
                                                <span className="icon-star"></span>
                                                Personnaliser</a>

                                        </span>
                                        <span className="i-b shim"></span>

                                        <span className="down-arrow"></span>
                                        <span className="down-arrow-shadow"></span>
                                    </li>


                                    <li id="nav-kids" className="nav-item dropdown-trigger">
                                        <span className="i-b content">
                                            <a href="#">Kids</a>
                                        </span>
                                        <span className="i-b shim"></span>
                                        <span className="down-arrow"></span>
                                        <span className="down-arrow-shadow"></span>
                                    </li>
                                </ul>
                            </div>

                            <Account />

                        </div>
                    </div>
                </div>
            );
        }
    });

    return Header;
});