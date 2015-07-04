/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 29/06/2015.
 */
define(['react', 'local-utils/BemMixin', 'local-utils/PureRenderMixin'], function (React, BemMixin, PureRenderMixin) {
    'use strict';


    var CalendarSelection = React.createClass({
        mixins: [BemMixin, PureRenderMixin],

        propTypes: {
            modifier: React.PropTypes.string,
            pending: React.PropTypes.bool.isRequired
        },

        render() {
            let modifier = this.props.modifier;
            let pending = this.props.pending;
            let modifiers = {modifier: true};
            let states = {
                pending
            };

            return (
                <div className={this.cx({states, modifiers})} />
            );
        }
    });

    return CalendarSelection;

});