/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 29/06/2015.
 */
define(['react', 'immutable', 'local-utils/BemMixin', 'local-utils/CustomPropTypes', 'local-utils/PureRenderMixin', 'local-utils/lightenDarkenColor', 'local-calendar/CalendarDatePeriod', 'local-calendar/CalendarHighlight', 'local-calendar/CalendarSelection'],
    function (React, Immutable, BemMixin, CustomPropTypes, PureRenderMixin, lightenDarkenColor, CalendarDatePeriod, CalendarHighlight, CalendarSelection) {
        'use strict';

        var CalendarDate = React.createClass({
            mixins: [BemMixin, PureRenderMixin],

            propTypes: {
                date: CustomPropTypes.moment,

                firstOfMonth: React.PropTypes.object.isRequired,

                isSelectedDate: React.PropTypes.bool,
                isSelectedRangeStart: React.PropTypes.bool,
                isSelectedRangeEnd: React.PropTypes.bool,
                isInSelectedRange: React.PropTypes.bool,

                isHighlightedDate: React.PropTypes.bool,
                isHighlightedRangeStart: React.PropTypes.bool,
                isHighlightedRangeEnd: React.PropTypes.bool,
                isInHighlightedRange: React.PropTypes.bool,

                highlightedDate: React.PropTypes.object,
                dateStates: React.PropTypes.instanceOf(Immutable.List),
                isDisabled: React.PropTypes.bool,
                isToday: React.PropTypes.bool,

                dateRangesForDate: React.PropTypes.func,
                onHighlightDate: React.PropTypes.func,
                onUnHighlightDate: React.PropTypes.func,
                onSelectDate: React.PropTypes.func
            },

            getInitialState() {
                return {
                    mouseDown: false
                };
            },

            mouseUp() {
                this.props.onSelectDate(this.props.date);

                if (this.state.mouseDown) {
                    this.setState({
                        mouseDown: false
                    });
                }
                document.removeEventListener('mouseup', this.mouseUp);
            },

            mouseDown() {
                this.setState({
                    mouseDown: true
                });
                document.addEventListener('mouseup', this.mouseUp);
            },

            touchEnd() {
                this.props.onHighlightDate(this.props.date);
                this.props.onSelectDate(this.props.date);

                if (this.state.mouseDown) {
                    this.setState({
                        mouseDown: false
                    });
                }
                document.removeEventListener('touchend', this.touchEnd);
            },

            touchStart(event) {
                event.preventDefault();
                this.setState({
                    mouseDown: true
                });
                document.addEventListener('touchend', this.touchEnd);
            },

            mouseEnter() {
                this.props.onHighlightDate(this.props.date);
            },

            mouseLeave() {
                if (this.state.mouseDown) {
                    this.props.onSelectDate(this.props.date);

                    this.setState({
                        mouseDown: false
                    });
                }
                this.props.onUnHighlightDate(this.props.date);
            },

            getBemModifiers() {
                //let {date, firstOfMonth, isToday: today} = this.props;
                let date = this.props.date;
                let firstOfMonth = this.props.firstOfMonth;
                let isToday = this.props.today;

                let otherMonth = false;
                let weekend = false;

                if (date.month() !== firstOfMonth.month()) {
                    otherMonth = true;
                }

                if (date.day() === 0 || date.day() === 6) {
                    weekend = true;
                }

                return {isToday, weekend, otherMonth};
            },

            getBemStates() {

                /*let {
                 isSelectedDate,
                 isInSelectedRange,
                 isInHighlightedRange,
                 isHighlightedDate: highlighted,
                 isDisabled: disabled,
                 } = this.props;
                 */

                let isSelectedDate = this.props.isSelectedDate;
                let isInSelectedRange = this.props.isInSelectedRange;
                let isInHighlightedRange = this.props.isInHighlightedRange;
                let isHighlightedDate = this.props.highlighted;
                let isDisabled = this.props.disabled;

                let selected = isSelectedDate || isInSelectedRange || isInHighlightedRange;

                return {isDisabled, highlighted, selected};
            },

            render() {
                /*
                 let {
                 date,
                 dateRangesForDate,
                 isSelectedDate,
                 isSelectedRangeStart,
                 isSelectedRangeEnd,
                 isInSelectedRange,
                 isHighlightedDate,
                 isHighlightedRangeStart,
                 isHighlightedRangeEnd,
                 isInHighlightedRange,
                 } = this.props;
                 */

                let date = this.props.date;
                let dateRangesForDate = this.props.dateRangesForDate;
                let isSelectedDate = this.props.isSelectedDate;
                let isSelectedRangeStart = this.props.isSelectedRangeStart;
                let isSelectedRangeEnd = this.props.isSelectedRangeEnd;
                let isInSelectedRange = this.props.isInSelectedRange;
                let isHighlightedDate = this.props.isHighlightedDate;
                let isHighlightedRangeStart = this.props.isHighlightedRangeStart;
                let isHighlightedRangeEnd = this.props.isHighlightedRangeEnd;
                let isInHighlightedRange = this.props.isInHighlightedRange;


                let bemModifiers = this.getBemModifiers();
                let bemStates = this.getBemStates();
                let pending = isInHighlightedRange;

                let color;
                let amColor;
                let pmColor;
                let states = dateRangesForDate(date);
                let numStates = states.count();
                let cellStyle = {};
                let style = {};

                let highlightModifier;
                let selectionModifier;

                if (isSelectedDate || (isSelectedRangeStart && isSelectedRangeEnd)
                    || (isHighlightedRangeStart && isHighlightedRangeEnd)) {
                    selectionModifier = 'single';
                } else if (isSelectedRangeStart || isHighlightedRangeStart) {
                    selectionModifier = 'start';
                } else if (isSelectedRangeEnd || isHighlightedRangeEnd) {
                    selectionModifier = 'end';
                } else if (isInSelectedRange || isInHighlightedRange) {
                    selectionModifier = 'segment';
                }

                if (isHighlightedDate) {
                    highlightModifier = 'single';
                }

                if (numStates === 1) {
                    // If there's only one state, it means we're not at a boundary
                    color = states.getIn([0, 'color']);

                    if (color) {

                        style = {
                            backgroundColor: color
                        };
                        cellStyle = {
                            borderLeftColor: lightenDarkenColor(color, -10),
                            borderRightColor: lightenDarkenColor(color, -10)
                        };
                    }
                } else {
                    amColor = states.getIn([0, 'color']);
                    pmColor = states.getIn([1, 'color']);

                    if (amColor) {
                        cellStyle.borderLeftColor = lightenDarkenColor(amColor, -10);
                    }

                    if (pmColor) {
                        cellStyle.borderRightColor = lightenDarkenColor(pmColor, -10);
                    }
                }

                return (
                    <td className={this.cx({element: 'Date', modifiers: bemModifiers, states: bemStates})}
                        style={cellStyle}
                        onTouchStart={this.touchStart}
                        onMouseEnter={this.mouseEnter}
                        onMouseLeave={this.mouseLeave}
                        onMouseDown={this.mouseDown}>
        {numStates > 1 &&
        <div className={this.cx({element: "HalfDateStates"})}>
            <CalendarDatePeriod period="am" color={amColor} />
            <CalendarDatePeriod period="pm" color={pmColor} />
        </div>}
        {numStates === 1 &&
        <div className={this.cx({element: "FullDateStates"})} style={style} />}
                        <span className={this.cx({element: "DateLabel"})}>{date.format('D')}</span>
        {selectionModifier ? <CalendarSelection modifier={selectionModifier} pending={pending} /> : null}
        {highlightModifier ? <CalendarHighlight modifier={highlightModifier} /> : null}
                    </td>
                );
            }
        });


        return CalendarDate;

    });