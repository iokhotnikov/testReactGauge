import React from 'react';
import $ from 'jquery';

class DXComponent extends React.Component {
    constructor(props) {
        super(props);
        this.dxComponent = props.dxComponent;
    }

    componentDidMount() {
        this.instance = new this.dxComponent($(this.refs.element), this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps) {
            this.instance.option(nextProps);
            return false;
        }

        return super.shouldComponentUpdate(nextProps, nextState);
    }

    setState(state) {
        super.setState(state);
        this.instance.option(state);
    }

    render() {
        return <div ref="element"></div>;
    }
}

DXComponent.displayName = 'DxComponent';

export default DXComponent;
