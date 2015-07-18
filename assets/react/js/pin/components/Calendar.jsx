/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 12/07/2015.
 */
var React = require('react');
var DateRangePicker = require('react-daterange-picker');
var eventEmitter = require('central-event');


var stateDefinitions = {
    available: {
        color: null,
        label: 'Available'
    },
    enquire: {
        color: '#ffd200',
        label: 'Enquire'
    },
    unavailable: {
        selectable: false,
        //color: '#78818b',
        color: null,
        label: 'Unavailable'
    }
};
/*
// Todo: Update dateRanges with info from the pin history
var dateRanges = [
    {
        state: 'enquire',
        range: moment().range(
            moment().add(2, 'weeks').subtract(5, 'days'),
            moment().add(2, 'weeks').add(6, 'days')
        )
    },
    {
        state: 'unavailable',
        range: moment().range(
            moment().add(3, 'weeks'),
            moment().add(3, 'weeks').add(5, 'days')
        )
    }
];
*/

var DatePicker = React.createClass({
    getInitialState: function () {
        // Todo: dateRanges / stateDefinitions
        return {
            value: null,
            stateDefinitions: stateDefinitions,
            dateRanges: []
        };
    },
    handleSelect: function (range, states) {
        // range is a moment-range object
        this.setState({
            value: range,
            states: states
        });

        // Raise event range updated
        eventEmitter.emit('rangeUpdated', range);
    },

    componentDidMount: function () {
        console.log("stateDefinitions: " + this.props.stateDefinitions);
    },

    render: function () {
        return (
            <DateRangePicker
                firstOfWeek={1}
                numberOfCalendars={2}
                selectionType='range'
                earliestDate={new Date()}
                stateDefinitions={this.state.stateDefinitions}
                dateStates={this.props.dateRanges}
                defaultState={this.props.defaultState}
                showLegend={false}
                value={this.state.value}
                onSelect={this.handleSelect}/>
        );
    }
});

module.exports = DatePicker;