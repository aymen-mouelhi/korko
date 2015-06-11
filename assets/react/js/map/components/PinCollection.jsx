/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react'], function (React) {
    'use strict';

    var PinCollection = React.createClass({
        getInitialState: function () {
            return {
                loading: false,
                canLoadMore: true,
                lastLoadedPage: 0,
                pins: {},
                error: false,
                xhr: null
            }
        },

        componentWillMount: function () {
            this.load()
        },

        componentDidUpdate: function (oprops, ostate) {

        },

        // data loading
        load: function () {
            console.info("loading content");
            if (this.state.xhr) {
                this.state.xhr.abort()
            }
            if (!this.state.canLoadMore) {
                return console.error('Got a request to load more, but there was no more')
            }
            // Todo: send current user location
            var url = '/pin';
            var xhr = $.get(url, this.gotData, 'json').fail(this.failed);
            this.setState({error: false, loading: true, xhr: xhr});
        },

        gotData: function (data) {

            var canLoadMore = data.length === 30;
            this.setState({
                loading: false,
                lastLoadedPage: this.state.lastLoadedPage + 1,
                canLoadMore: canLoadMore,
                pins: data,
                error: false,
                xhr: null
            });

            if (canLoadMore) {
                this.load();
            }
        },

        failed: function (xhr, status, reason) {
            this.setState({error: reason || true});
        },

        render: function () {

            var pinsArray = new Array();

            for (var i in this.state.pins) {
                var pin = this.state.pins[i];
                pinsArray.push(pin);
            }

            var pinNodes = pinsArray.map(function (pin) {
                return (
                    <div className="pin">
                        <img src={pin.image} />
                        <p>
                    {pin.text}
                        </p>
                    </div>
                );
            });

            return (
                <div id="wrapper">
                    <div id="columns">
                        <div>
                    {pinNodes}
                        </div>
                    </div>
                </div>
            );
        }
    });

    return PinCollection;

});