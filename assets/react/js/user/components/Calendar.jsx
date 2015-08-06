/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 06/08/2015.
 */
var ReactWidgets = require('react-widgets');

var Calendar = ReactWidgets.Calendar;

var DayComponent = React.createClass({
    render() {
        var date = this.props.date
            , style = { backgroundColor: date < new Date() && '#F57B7B' }

        return (<div style={style}>
            {this.props.label}
        </div>);
    }
})

var widget = (
    <Calendar
        dayComponent={DayComponent}/>
)

React.render(widget, mountNode);