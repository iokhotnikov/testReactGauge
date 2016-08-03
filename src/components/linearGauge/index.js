import _ from 'lodash';
import React, { PropTypes } from 'react';
import { scaleLinear } from 'd3-scale';

import ValueIndicator from './valueIndicator';
import Axis from '../axis';

const getValueIndicator = (x, y, value, style, linearScale) => (
    <ValueIndicator
        x={x}
        y={y}
        value={value}
        style={style}
        linearScale={linearScale}
    />);
const getSubvalueIndicators = (x, y, parentProps, scale) =>
    React.Children.toArray(parentProps.children).map(
        (child, index) => {
            const subValueX = child.props.value
                ? scale(child.props.value)
                : x;
            return (
                <g
                    key={index}
                    style={{ transform: `translate(${subValueX}px, ${y}px)` }}
                    className="subValueIndicatorGroup"
                >
                    {ValueIndicator.createSubvalueIndicator(
                        child,
                        scale,
                        parentProps,
                        index
                    )}
                </g>
            );
        }
    );

const Gauge = (customProps) => {
    const props = _.merge({}, Gauge.defaultProps, customProps);
    const domainPadding = props.size.width / 10;
    const startValue = props.scale.customTicks.length > 0 ?
        _.min(props.scale.customTicks) : props.scale.startValue;
    let linearScale = scaleLinear().range([0, props.size.width - (domainPadding * 2)]);
    let ticks;
    if (props.scale.customTicks && props.scale.customTicks.length > 0) {
        linearScale = linearScale.domain([
            _.min(props.scale.customTicks),
            _.max(props.scale.customTicks)
        ]);
        ticks = props.scale.customTicks;
    } else {
        linearScale = linearScale.domain([props.scale.startValue, props.scale.endValue]);
        ticks = linearScale.ticks();
    }
    let valueIndicator = (props.valueIndicator && !props.valueIndicator.on)
        ? ''
        : getValueIndicator(
            linearScale(startValue),
            props.rangeContainer.valueIndicatorOffset,
            props.value,
            props.valueIndicator,
            linearScale);
    let subValueIndicators = !customProps.children
        ? ''
        : getSubvalueIndicators(
            linearScale(props.value),
            props.rangeContainer.valueIndicatorOffset,
            props,
            linearScale);
    const topPadding = props.rangeContainer.topPadding ? props.rangeContainer.topPadding : 0;
    return (
        <svg width={props.size.width} height={props.size.height} className="dx-react-gauge">
            <g transform={`translate(${domainPadding},${topPadding})`}>
                <Axis
                    height={props.size.height}
                    customTicks={ticks}
                    linearScale={linearScale}
                    scale={props.scale}
                    rangeContainer={props.rangeContainer}
                    tick={props.scale.tick}
                />
                {valueIndicator}
                {subValueIndicators}
            </g>
        </svg>
    );
};

Gauge.propTypes = {
    size: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    scale: PropTypes.shape({
        customTicks: PropTypes.arrayOf(PropTypes.number),
        startValue: PropTypes.number,
        endValue: PropTypes.number,
        tick: PropTypes.shape({
            color: PropTypes.string,
            width: PropTypes.number
        })
    }),
    value: PropTypes.number,
    rangeContainer: PropTypes.shape({
        backgroundColor: PropTypes.string,
        valueIndicatorOffset: PropTypes.number,
        axisOffset: PropTypes.number,
        labelOffset: PropTypes.number,
        topPadding: PropTypes.number
    }),
    valueIndicator: PropTypes.shape({
        color: PropTypes.string,
        stroke: PropTypes.string,
        strokeWidth: PropTypes.number,
        on: PropTypes.bool
    }),
    children: React.PropTypes.oneOfType([
        PropTypes.arrayOf(React.PropTypes.node),
        PropTypes.node
    ])
};

Gauge.defaultProps = {
    scale: {
        startValue: 0,
        endValue: 100,
        customTicks: [],
        tick: {
            color: 'white',
            width: 2
        }
    },
    size: {
        width: 500,
        height: 500
    },
    value: 0,
    rangeContainer: {
        valueIndicatorOffset: 5,
        axisOffset: 0,
        labelOffset: 30,
        backgroundColor: 'gray',
        topPadding: 5
    },
    valueIndicator: {
        color: '#C2C2C2',
        stroke: '#C2C2C2',
        strokeWidth: 0,
        on: true
    }
};

export default Gauge;
