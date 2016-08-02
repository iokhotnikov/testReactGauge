import React from 'react';
import ReactDOM from 'react-dom';
import { Gauge } from '../src';
import _ from 'lodash';

class GaugeContainer extends React.Component {
    constructor() {
        super();
        this.state = { value: 42 };
    }

    componentDidMount() {
        this.timer = setInterval(() => { this.setState({ value: _.random(0, 100) }); }, 2000);
    }

    render() {
        return <Gauge value={this.state.value} />;
    }
}



ReactDOM.render(
    <GaugeContainer />,
    document.getElementById('root')
);
