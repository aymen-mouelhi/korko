/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 29/06/2015.
 */
define(['react', 'utils/BemMixin', 'utils/PureRenderMixin'], function (React, BemMixin, PureRenderMixin) {
    'use strict';


    var CalendarDatePeriod = React.createClass({
        mixins: [BemMixin, PureRenderMixin],

        propTypes: {
            color: React.PropTypes.string,
            period: React.PropTypes.string
        },

        render() {
            let {color, period} = this.props;
            let modifiers = {[period]: true};
            let style;

            if (color) {
                style = {backgroundColor: color};
            }

            return (
                <div style={style} className={this.cx({modifiers})} />
            );
        }
    });

    return CalendarDatePeriod;

});