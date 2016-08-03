import React from 'react';

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
                className="valueIndicator"
                {...props.style}
            />
        </g>
    );
};

ValueIndicator.propTypes = {
    value: React.PropTypes.number,
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    height: React.PropTypes.number,
    style: React.PropTypes.object,
    linearScale: React.PropTypes.func.isRequired
};

ValueIndicator.defaultProps = {
    height: 10
};

const SubValueIndicator = (props) => {
    const subValueX = props.scale(props.childTemplate.props.value);
    return (
        <g
            style={{ transform: `translate(${subValueX}px, 0px)` }}
            className="subValueIndicatorGroup"
        >
            {props.childTemplate}
        </g>
    );
};

SubValueIndicator.propTypes = {
    childTemplate: React.PropTypes.node,
    scale: React.PropTypes.func.isRequired
};

export { ValueIndicator, SubValueIndicator };
