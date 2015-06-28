/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 29/06/2015.
 */
define(['react', 'utils/BemMixin'], function (React, BemMixin) {
    'use strict';

    const PureRenderMixin = React.addons.PureRenderMixin;

    var PaginationArrow = React.createClass({

        mixins: [BemMixin, PureRenderMixin],

        propTypes: {
            disabled: React.PropTypes.bool,
            direction: React.PropTypes.oneOf(['next', 'previous'])
        },

        getDefaultProps: function () {
            return {
                disabled: false
            };
        },

        render: function () {
            var disabled = this.props.disabled;
            var direction = this.props.direction;
            var props = this.props;

            let modifiers = {[direction]: true};
            let states = {disabled};

            let elementOpts = {
                modifiers,
                states
            };

            let iconOpts = {
                element: 'PaginationArrowIcon',
                modifiers,
                states
            };

            return (
                <div className={this.cx(elementOpts)} {...props}>
                    <div className={this.cx(iconOpts)} />
                </div>
            );
        }

    });


    return PaginationArrow;
});