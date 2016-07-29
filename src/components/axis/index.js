import React, { PropTypes } from 'react';
import { getDAttribute } from './helper';

import _ from 'lodash';

import Label from '../label';

const Axis = (props) => {
    const scale = props.linearScale;
    const customTicks = props.customTicks;
    const startValue = _.min(props.scale.customTicks) || props.scale.startValue;
    const endValue = _.max(props.scale.customTicks) || props.scale.endValue;
    const axisTicks = customTicks.map((item, index) =>
        <path
            key={index}
            d={getDAttribute(scale(item), props.rangeContainer.axisOffset)}
            stroke={props.tick.color}
            strokeWidth={props.tick.width}
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
            height={5}
            width={scale(endValue) - scale(startValue)}
            fill={props.rangeContainer.backgroundColor}
        />;

    return (
        <g className="axis">
            <RangeContainer />
            {axisTicks}
            {labels}
        </g>
    );
};

Axis.propTypes = {
    customTicks: PropTypes.arrayOf(React.PropTypes.number),
    linearScale: PropTypes.func.isRequired,
    rangeContainer: PropTypes.object,
    tick: PropTypes.object,
    scale: PropTypes.object
};

export default Axis;
