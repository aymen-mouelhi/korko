/**
 * Created by Aymen Mouelhi (aymen.mouelhi@gmail.com) on 29/06/2015.
 */
define(['react', 'local-utils/BemMixin'], function (React, BemMixin) {
    'use strict';

    const PureRenderMixin = React.addons.PureRenderMixin;

    var Legend = React.createClass({
        mixins: [BemMixin, PureRenderMixin],

        propTypes: {
            selectedLabel: React.PropTypes.string.isRequired,
            stateDefinitions: React.PropTypes.object.isRequired
        },

        render() {
            let selectedLabel = this.props.selectedLabel;
            let stateDefinitions = this.props.stateDefinitions;
            let items = [];
            let name;
            let def;
            let style;

            for (name in stateDefinitions) {
                def = stateDefinitions[name];
                if (def.label && def.color) {
                    style = {
                        backgroundColor: def.color
                    };
                    items.push(
                        <li className={this.cx({element: 'LegendItem'})} key={name}>
                            <span className={this.cx({element: 'LegendItemColor'})} style={style} />
                            <span className={this.cx({element: 'LegendItemLabel'})}>{def.label}</span>
                        </li>
                    );
                }
            }

            return (
                <ul className={this.cx()}>
                    <li className={this.cx({element: 'LegendItem'})}>
                        <span className={this.cx({element: 'LegendItemColor', modifiers: {'selection': true}})} />
                        <span className={this.cx({element: 'LegendItemLabel'})}>{selectedLabel}</span>
                    </li>
        {items}
                </ul>
            );
        }
    });

    return Legend;
});