import React from 'react';
import _ from 'lodash';

import '../linearGauge/styles.css';

const ValueIndicator = (props) => {
    const width = props.linearScale(props.value) - props.x;
    const height = props.height;

    return (
        <g className="valueIndicatorGroup" transform={`translate(${props.x}, ${props.y})`}>
            <rect
                x={0}
                y={0}
                width={width > 0 ? width : 0}
                height={height}
                fill={props.style.color}
                stroke={props.style.stroke}
                strokeWidth={props.style.strokeWidth}
                className="valueIndicator"
            />
        </g>
    );
};

ValueIndicator.propTypes = {
    value: React.PropTypes.number,
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    height: React.PropTypes.number,
    style: React.PropTypes.object,
    linearScale: React.PropTypes.func.isRequired
};

ValueIndicator.defaultProps = {
    value: 0,
    x: 0,
    y: 0,
    height: 10
};

const getCustomizeMarkup = (child, parentProps, valueXY) => {
    const childProps =
        _.omit(
            _.merge({},
                child.props,
                child.props.customize(
                    valueXY,
                    parentProps,
                    child.props
                )
            ), 'customize'
        );
    return (
        <child.type
            {...childProps}
        >{child.props.children}</child.type>);
};

ValueIndicator.getSubvalueIndicators = (x, y, parentProps, scale) =>
    React.Children.toArray(parentProps.children).map(
        (child, index) => {
            const subValueX = child.props.value
                ? scale(child.props.value)
                : x;
            let childMarkup;
            if (child.props.customize) {
                childMarkup = getCustomizeMarkup(child, parentProps, { x: subValueX, y });
            } else {
                childMarkup = child;
            }
            return (
                <g
                    key={index}
                    style={{ transform: `translate(${subValueX}px, 0px)` }}
                    className="subValueIndicatorGroup"
                >
                    {childMarkup}
                </g>
            );
        }
    );
export default ValueIndicator;
