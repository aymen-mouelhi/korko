/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 29/06/2015.
 */

/**
 * @jsx React.DOM
 */
/*jshint quotmark: false */
/*jshint white: false */
/*jshint trailing: false */
/*jshint newcap: false */
/*global React */
define(['react', 'moment', 'immutable', 'calendar', 'local-utils/BemMixin', 'local-utils/CustomPropTypes', 'local-app/Legend', 'local-calendar/CalendarMonth', 'local-calendar/CalendarDate', 'local-app/PaginationArrow', 'local-utils/isMomentRange'],
    function (React, moment, Immutable, Calendar, BemMixin, CustomPropTypes, Legend, CalendarMonth, CalendarDate, PaginationArrowComponent, isMomentRange) {
    'use strict';

    const PureRenderMixin = React.addons.PureRenderMixin;
    const absoluteMinimum = moment(new Date(-8640000000000000 / 2)).startOf('day');
    const absoluteMaximum = moment(new Date(8640000000000000 / 2)).startOf('day');

    React.initializeTouchEvents(true);


    var DateRangePicker = React.createClass({
        mixins: [BemMixin, PureRenderMixin],

        propTypes: {
            bemBlock: React.PropTypes.string,
            bemNamespace: React.PropTypes.string,
            dateStates: React.PropTypes.array, // an array of date ranges and their states
            defaultState: React.PropTypes.string,
            disableNavigation: React.PropTypes.bool,
            firstOfWeek: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
            initialDate: React.PropTypes.instanceOf(Date),
            initialFromValue: React.PropTypes.bool,
            initialMonth: React.PropTypes.number, // Overrides values derived from initialDate/initialRange
            initialRange: React.PropTypes.object,
            initialYear: React.PropTypes.number, // Overrides values derived from initialDate/initialRange
            maximumDate: React.PropTypes.instanceOf(Date),
            minimumDate: React.PropTypes.instanceOf(Date),
            numberOfCalendars: React.PropTypes.number,
            onHighlightDate: React.PropTypes.func, // triggered when a date is highlighted (hovered)
            onHighlightRange: React.PropTypes.func, // triggered when a range is highlighted (hovered)
            onSelect: React.PropTypes.func, // triggered when a date or range is selectec
            onSelectStart: React.PropTypes.func, // triggered when the first date in a range is selected
            paginationArrowComponent: React.PropTypes.func,
            selectedLabel: React.PropTypes.string,
            selectionType: React.PropTypes.oneOf(['single', 'range']),
            singleDateRange: React.PropTypes.bool,
            showLegend: React.PropTypes.bool,
            stateDefinitions: React.PropTypes.object,
            value: CustomPropTypes.momentOrMomentRange
        },

        getDefaultProps() {
            let date = new Date();
            let initialDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

            return {
                bemNamespace: null,
                bemBlock: 'DateRangePicker',
                numberOfCalendars: 1,
                firstOfWeek: 0,
                disableNavigation: false,
                nextLabel: '',
                previousLabel: '',
                initialDate: initialDate,
                initialFromValue: true,
                selectionType: 'range',
                singleDateRange: false,
                stateDefinitions: {
                    '__default': {
                        color: null,
                        selectable: true,
                        label: null
                    }
                },
                selectedLabel: "Your selected dates",
                defaultState: '__default',
                dateStates: [],
                showLegend: false,
                onSelect: function(){},
                paginationArrowComponent: PaginationArrowComponent
            };
        },

        componentWillReceiveProps(nextProps) {
            var nextDateStates = this.getDateStates(nextProps);
            var nextEnabledRange = this.getEnabledRange(nextProps);

            this.setState({
                dateStates: this.state.dateStates && Immutable.is(this.state.dateStates, nextDateStates) ? this.state.dateStates : nextDateStates,
                enabledRange: this.state.enabledRange && Immutable.is(this.state.enabledRange, nextEnabledRange) ? this.state.enabledRange : nextEnabledRange
            });
        },

        getInitialState() {
            let now = new Date();

            var initialYear = this.props.initialYear;
            var initialMonth = this.props.initialMonth;
            var initialFromValue = this.props.initialFromValue;
            var selectionType = this.props.selectionType;
            var value = this.props.value;

            let year = now.getFullYear();
            let month = now.getMonth();

            if (initialYear && initialMonth) {
                year = initialYear;
                month = initialMonth;
            }

            if (initialFromValue && value) {
                if (selectionType === 'single') {
                    year = value.year();
                    month = value.month();
                } else {
                    year = value.start.year();
                    month = value.start.month();
                }
            }

            return {
                year: year,
                month: month,
                selectedStartDate: null,
                highlightStartDate: null,
                highlightedDate: null,
                highlightRange: null,
                hideSelection: false,
                enabledRange: this.getEnabledRange(this.props),
                dateStates: this.getDateStates(this.props)
            };
        },

        getEnabledRange(props) {
            let min = props.minimumDate ? moment(props.minimumDate).startOf('day') : absoluteMinimum;
            let max = props.maximumDate ? moment(props.maximumDate).startOf('day') : absoluteMaximum;

            return moment.range(min, max);
        },

        getDateStates(props) {
            var dateStates = props.dateStates;
            var defaultState = props.defaultState;
            var stateDefinitions = props.stateDefinitions;
            let actualStates = [];
            let minDate = absoluteMinimum;
            let maxDate = absoluteMaximum;
            let dateCursor = moment(minDate).startOf('day');

            let defs = Immutable.fromJS(stateDefinitions);

            dateStates.forEach(function (s) {
                let r = s.range;
                let start = r.start.startOf('day');
                let end = r.end.startOf('day');

                if (!dateCursor.isSame(start)) {
                    actualStates.push({
                        state: defaultState,
                        range: moment.range(
                            dateCursor,
                            start
                        )
                    });
                }
                actualStates.push(s);
                dateCursor = end;
            });

            actualStates.push({
                state: defaultState,
                range: moment.range(
                    dateCursor,
                    maxDate
                )
            });

            // sanitize date states
            return Immutable.List(actualStates).map(function (s) {
                let def = defs.get(s.state);
                return Immutable.Map({
                    range: s.range,
                    state: s.state,
                    selectable: def.get('selectable', true),
                    color: def.get('color')
                });
            });
        },

        isDateDisabled(date) {
            return !this.state.enabledRange.contains(date);
        },

        isDateSelectable(date) {
            //return this.dateRangesForDate(date).some(r => r.get('selectable'));
            return this.dateRangesForDate(date).some(function (r) {
                return r.get('selectable');
            });
        },

        nonSelectableStateRanges() {
            return this.state.dateStates.filter(function (d) {
                return !d.get('selectable');
            });
        },

        dateRangesForDate(date) {
            return this.state.dateStates.filter(function (d) {
                return d.get('range').contains(date);
            });
        },

        sanitizeRange(range, forwards) {
            /* Truncates the provided range at the first intersection
             * with a non-selectable state. Using forwards to determine
             * which direction to work
             */
            let blockedRanges = this.nonSelectableStateRanges().map(function (r) {
                return r.get('range');
            });
            let intersect;

            if (forwards) {
                intersect = blockedRanges.find(function (r) {
                    return range.intersect(r);
                });
                if (intersect) {
                    return moment.range(range.start, intersect.start);
                }

            } else {
                intersect = blockedRanges.findLast(function (r) {
                    return range.intersect(r);
                });

                if (intersect) {
                    return moment.range(intersect.end, range.end);
                }
            }

            if (range.start.isBefore(this.state.enabledRange.start)) {
                return moment.range(this.state.enabledRange.start, range.end);
            }

            if (range.end.isAfter(this.state.enabledRange.end)) {
                return moment.range(range.start, this.state.enabledRange.end);
            }

            return range;
        },

        highlightRange(range) {
            this.setState({
                highlightedRange: range,
                highlightedDate: null
            });
            if (typeof this.props.onHighlightRange === 'function') {
                this.props.onHighlightRange(range, this.statesForRange(range));
            }
        },

        onUnHighlightDate() {
            this.setState({
                highlightedDate: null
            });
        },

        onSelectDate(date) {
            var selectionType = this.props;
            var selectedStartDate = this.state;

            if (selectionType === 'range') {
                if (selectedStartDate) {
                    this.completeRangeSelection();
                } else if (!this.isDateDisabled(date) && this.isDateSelectable(date)) {
                    this.startRangeSelection(date);
                    if (this.props.singleDateRange) {
                        this.highlightRange(moment.range(date, date));
                    }
                }

            } else {
                if (!this.isDateDisabled(date) && this.isDateSelectable(date)) {
                    this.completeSelection();
                }
            }
        },

        onHighlightDate(date) {
            var selectionType = this.props;
            var selectedStartDate = this.state;

            let datePair;
            let range;
            let forwards;

            if (selectionType === 'range') {
                if (selectedStartDate) {
                    datePair = Immutable.List.of(selectedStartDate, date).sortBy(function (d) {
                        return d.unix();
                    });
                    range = moment.range(datePair.get(0), datePair.get(1));
                    forwards = (range.start.unix() === selectedStartDate.unix());
                    range = this.sanitizeRange(range, forwards);
                    this.highlightRange(range);
                } else if (!this.isDateDisabled(date) && this.isDateSelectable(date)) {
                    this.highlightDate(date);
                }
            } else {
                if (!this.isDateDisabled(date) && this.isDateSelectable(date)) {
                    this.highlightDate(date);
                }
            }
        },

        startRangeSelection(date) {
            this.setState({
                hideSelection: true,
                selectedStartDate: date
            });
            if (typeof this.props.onSelectStart === 'function') {
                this.props.onSelectStart(moment(date));
            }
        },

        statesForDate(date) {
            return this.state.dateStates.filter(function (d) {
                return date.within(d.get('range'));
            }).map(function (d) {
                return d.get('state');
            });
        },

        statesForRange(range) {
            if (range.start.isSame(range.end)) {
                return this.statesForDate(range.start);
            }
            return this.state.dateStates.filter(function (d) {
                return d.get('range').intersect(range);
            }).map(function (d) {
                return d.get('state');
            });
        },

        completeSelection() {
            let highlightedDate = this.state.highlightedDate;
            if (highlightedDate) {
                this.setState({
                    hideSelection: false,
                    highlightedDate: null
                });
                this.props.onSelect(highlightedDate, this.statesForDate(highlightedDate));
            }
        },

        completeRangeSelection() {
            let range = this.state.highlightedRange;

            if (range && (!range.start.isSame(range.end) || this.props.singleDateRange)) {
                this.setState({
                    selectedStartDate: null,
                    highlightedRange: null,
                    highlightedDate: null,
                    hideSelection: false
                });
                this.props.onSelect(range, this.statesForRange(range));
            }
        },

        highlightDate(date) {
            this.setState({
                highlightedDate: date
            });
            if (typeof this.props.onHighlightDate === 'function') {
                this.props.onHighlightDate(date, this.statesForDate(date));
            }
        },

        getMonthDate() {
            return moment(new Date(this.state.year, this.state.month, 1));
        },

        canMoveBack() {
            if (this.getMonthDate().subtract(1, 'days').isBefore(this.state.enabledRange.start)) {
                return false;
            }
            return true;
        },

        moveBack() {
            let monthDate;

            if (this.canMoveBack()) {
                monthDate = this.getMonthDate();
                monthDate.subtract(1, 'months');
                this.setState({
                    year: monthDate.year(),
                    month: monthDate.month()
                });
            }
        },

        moveBackIfSelecting() {
            if (this.state.selectedStartDate) {
                this.moveBack();
            }
        },

        canMoveForward() {
            if (this.getMonthDate().add(this.props.numberOfCalendars, 'months').isAfter(this.state.enabledRange.end)) {
                return false;
            }
            return true;
        },

        moveForward() {
            let monthDate;

            if (this.canMoveForward()) {
                monthDate = this.getMonthDate();
                monthDate.add(1, 'months');
                this.setState({
                    year: monthDate.year(),
                    month: monthDate.month()
                });
            }
        },

        moveForwardIfSelecting() {
            if (this.state.selectedStartDate) {
                this.moveForward();
            }
        },

        changeYear(year) {
            var enabledRange = this.state.enabledRange;
            var month = this.state.month;

            if (moment({years: year, months: month, date: 1}).unix() < enabledRange.start.unix()) {
                month = enabledRange.start.month();
            }

            if (moment({years: year, months: month + 1, date: 1}).unix() > enabledRange.end.unix()) {
                month = enabledRange.end.month();
            }

            this.setState({
                year: year,
                month: month
            });
        },

        changeMonth(date) {
            this.setState({
                month: date
            });
        },

        renderCalendar(index) {
            var bemBlock = this.props.bemBlock;
            var bemNamespace = this.props.bemNamespace;
            var firstOfWeek = this.props.firstOfWeek;
            var numberOfCalendars = this.props.numberOfCalendars;
            var selectionType = this.props.selectionType;
            var value = this.props.value;

            var dateStates = this.state.dateStates;
            var enabledRange = this.state.enabledRange;
            var hideSelection = this.state.hideSelection;
            var highlightedDate = this.state.highlightedDate;
            var highlightedRange = this.state.highlightedRange;

            let monthDate = this.getMonthDate();
            let year = monthDate.year();
            let month = monthDate.month();
            let key = `${ index}-${ year }-${ month }`;
            let props;

            monthDate.add(index, 'months');

            let cal = new Calendar(firstOfWeek);
            let monthDates = Immutable.fromJS(cal.monthDates(monthDate.year(), monthDate.month()));
            let monthStart = monthDates.first().first();
            let monthEnd = monthDates.last().last();
            let monthRange = moment.range(monthStart, monthEnd);

            if (moment.isMoment(value)) {
                if (!monthRange.contains(value)) {
                    value = null;
                }
            } else if (isMomentRange(value)) {
                if (!monthRange.overlaps(value)) {
                    value = null;
                }
            }

            if (!moment.isMoment(highlightedDate) || !monthRange.contains(highlightedDate)) {
                highlightedDate = null;
            }

            if (!isMomentRange(highlightedRange) || !monthRange.overlaps(highlightedRange)) {
                highlightedRange = null;
            }

            props = {
                bemBlock,
                bemNamespace,
                dateStates,
                enabledRange,
                firstOfWeek,
                hideSelection,
                highlightedDate,
                highlightedRange,
                index,
                key,
                selectionType,
                value,
                maxIndex: numberOfCalendars - 1,
                firstOfMonth: monthDate,
                onMonthChange: this.changeMonth,
                onYearChange: this.changeYear,
                onSelectDate: this.onSelectDate,
                onHighlightDate: this.onHighlightDate,
                onUnHighlightDate: this.onUnHighlightDate,
                dateRangesForDate: this.dateRangesForDate,
                dateComponent: CalendarDate
            };

            return <CalendarMonth {...props} />;
        },

        render: function () {
            var paginationArrowComponent = this.props.PaginationArrowComponent;
            var numberOfCalendars = this.props.numberOfCalendars;
            var stateDefinitions = this.props.stateDefinitions;
            var selectedLabel = this.props.selectedLabel;
            var showLegend = this.props.showLegend;
            // var {paginationArrowComponent: PaginationArrowComponent, numberOfCalendars, stateDefinitions, selectedLabel, showLegend} = this.props;

            let calendars = Immutable.Range(0, numberOfCalendars).map(this.renderCalendar);

            return (
                <div className={this.cx({element: null})}>
                    <PaginationArrowComponent direction="previous" onMouseEnter={this.moveBackIfSelecting} onClick={this.moveBack} disabled={!this.canMoveBack()} />
        {calendars.toJS()}
                    <PaginationArrowComponent direction="next" onMouseEnter={this.moveForwardIfSelecting} onClick={this.moveForward} disabled={!this.canMoveForward()} />
        {showLegend ? <Legend stateDefinitions={stateDefinitions} selectedLabel={selectedLabel} /> : null}
                </div>
            );
        }
    });


    return DateRangePicker;

});