import React from 'react';
import _ from 'lodash';
import './styles.css';

const ValueIndicator = (props) => {
    const width = props.linearScale(props.value) - props.x;
    const height = props.height;

    return (
        <g className="valueIndicatorGroup" transform={`translate(${props.x}, ${props.y})`}>
            <rect
                x={0}
                y={0}
                width={width}
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

ValueIndicator.createSubvalueIndicator = (children, scale, parentProps) =>
    React.Children.toArray(parentProps.children).map(
        (child, index) => {
            if (child.props.customize) {
                const childProps =
                    _.omit(
                        _.merge({},
                            child.props,
                            child.props.customize(
                                {
                                    x: scale(parentProps.value),
                                    y: parentProps.rangeContainer.valueIndicatorOffset
                                },
                                parentProps,
                                child.props
                            )
                        ), 'customize'
                    );
                return (
                    <child.type
                        key={child.props.key + index}
                        {...childProps}
                    >{child.props.children}</child.type>);
            }
            return child;
        });

export default ValueIndicator;
