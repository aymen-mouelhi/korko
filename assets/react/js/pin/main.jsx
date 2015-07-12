/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 24/05/2015.
 */
var React = require('react');
var App = require('./components/App.jsx');
var Pin = require('./components/Pin.jsx');
// var Calendar = require('./components/Calendar.jsx');


if (document.getElementById('react').getAttribute("pin")) {
    React.render(<Pin pin={document.getElementById("react").getAttribute("pin")} />, document.getElementById("react"));
}else{
    React.render(<App />, document.getElementById("react"));
}

React.render(<Calendar />, document.getElementById("react"));
