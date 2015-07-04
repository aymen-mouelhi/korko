/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'utils'], function (React, Utils) {
    'use strict';


    var Filters = React.createClass({
        /**
         * When a suggest got selected
         * @param  {Object} suggest The suggest
         */
        onSuggestSelect: function (suggest) {
            console.log(suggest);

            // Set new Search Area
            // Update Search Area in Map
            //suggest.location.lat / suggest.location.lng
            /*
             var mapOptions = {
             zoom: 15,
             center: new google.maps.LatLng(suggest.location.lat, suggest.location.lng)
             };
             */
            // console.log("Map from Mixins: "+ Map);
            // Map.updateLocation(new google.maps.LatLng(suggest.location.lat, suggest.location.lng));
            //document.getElementById('map-canvas').gMap.setCenter(new google.maps.LatLng(suggest.location.lat, suggest.location.lng));

            Utils.updateLocation(suggest, 500);
        },

        render: function () {
            return (
                <div>

                    <div className="filters">
                        <form className="pure-form pure-form-stacked">
                            <fieldset>
                                <legend>Find Items Around You</legend>

                                <div className="pure-g">
                                    <div className="pure-u-1 pure-u-md-1-3">
                                        <label for="keyword">keyword</label>
                                        <input id="keyword" className="pure-u-23-24" type="text" />
                                    </div>

                                    <div className="pure-u-1 pure-u-md-1-3">
                                        <label for="category">Category</label>
                                        <select id="category" className="pure-input-1-2">
                                            <option>All</option>
                                            <option>To be Shared</option>
                                            <option>Help is needed</option>
                                            <option>Deals</option>
                                            <option>Job Offers</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="pure-button pure-button-primary">Search</button>

                            </fieldset>
                        </form>
                    </div>
                </div>
            );
        }
    });

    return Filters;

});
