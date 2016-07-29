import React from 'react';

const ValueIndicator = (props) => {
    const width = props.linearScale(props.value) - props.x;
    const height = props.height;

    return (
        <rect
            x={props.x}
            y={props.y}
            width={width}
            height={height}
            fill={props.style.color}
            stroke={props.style.stroke}
            strokeWidth={props.style.strokeWidth}
            className="valueIndicator"
        />);
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

export default ValueIndicator;
