/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 29/06/2015.
 */
define(['react', 'local-utils/BemMixin', 'local-utils/PureRenderMixin'], function (React, BemMixin, PureRenderMixin) {
    'use strict';

    var CalendarHighlight = React.createClass({
        mixins: [BemMixin, PureRenderMixin],

        propTypes: {
            modifier: React.PropTypes.string
        },

        render() {
            let modifier = this.props.modifier;
            let modifiers = {modifier: true};
            let states = {};

            return (
                <div className={this.cx({states, modifiers})} />
            );
        }
    });


    return CalendarHighlight;

});