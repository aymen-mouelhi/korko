
define(['local-utils/shallowEqual'], function (shallowEqual) {
    'use strict';

    var PureRenderMixin = {
        shouldComponentUpdate(nextProps, nextState) {
            return (
            !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState)
            );
        }
    };

    return PureRenderMixin;
});