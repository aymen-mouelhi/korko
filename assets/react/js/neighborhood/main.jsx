/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 20/05/2015.
 */
var React = require('react');
var Map = require('./components/Map.jsx');

if (document.getElementById('react').getAttribute("neighborhood")) {
    React.render(<Map location={document.getElementById("react").getAttribute("neighborhood")}
                      showRemove={true}/>, document.getElementById("react"));
} else {
    React.render(<Map />, document.getElementById("react"));
}