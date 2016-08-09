import React, { PropTypes } from 'react';
import { getDAttribute } from './helper';

import _ from 'lodash';
import Label from '../label';

const getTickColor = (value) => {
    if (value <= 68) {
        return '#cbe8f6';
    }
    if (value <= 75.2) {
        return '#c7e4e3';
    }
    if (value <= 80.6) {
        return '#faedb7';
    }
    return '#facdb7';
};

const Axis = (props) => {
    const scale = props.linearScale;
    const customTicks = props.customTicks;
    const startValue = _.min(props.scale.customTicks) || props.scale.startValue;
    const endValue = _.max(props.scale.customTicks) || props.scale.endValue;
    const axisTicks = customTicks.map((item, index) =>
        <path
            key={index}
            d={getDAttribute(scale(item), props.rangeContainer.axisOffset, true)}
            stroke={props.tick.color}
            strokeWidth={props.tick.width}
        />
    );

    const axisMinorTicks = props.minorTicks.map((item, index) =>
        <path
            key={index}
            d={getDAttribute(scale(item), props.rangeContainer.axisOffset)}
            stroke={getTickColor(item)}
            strokeWidth={props.tick.width}
        />
    );

    const rects = customTicks.map((item, index) =>
        <rect
            key={index}
            x={scale(item) - 7.5}
            width={15}
            height={15}
            y={props.rangeContainer.labelOffset - 9}
            fill={'white'}
        />
    );

    const labels = customTicks.map((item, index) =>
        <Label
            key={index}
            x={scale(item)}
            value={Math.round(item * 100) / 100}
            y={props.rangeContainer.labelOffset}
        />
    );

    const RangeContainer = () =>
        <rect
            x={scale(startValue)}
            y={props.rangeContainer.axisOffset}
            height={props.rangeContainer.width}
            width={scale(endValue) - scale(startValue)}
            fill={props.rangeContainer.backgroundColor}
        />;

    return (
        <g className="axis">
            <RangeContainer />
            {axisMinorTicks}
            {axisTicks}
            {rects}
            {labels}
        </g>
    );
};

Axis.propTypes = {
    customTicks: PropTypes.arrayOf(React.PropTypes.number),
    linearScale: PropTypes.func.isRequired,
    rangeContainer: PropTypes.object,
    tick: PropTypes.object,
    scale: PropTypes.object,
    minorTicks: PropTypes.array
};

export default Axis;
