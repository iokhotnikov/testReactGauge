import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Gauge } from '../../src';
import DXLinearGauge from '../components/dxLinearGauge';
import './styles.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 42,
            selectedViewIndex: 0
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => { this.setState({ value: _.random(0, 100) }); }, 2000);
    }

    changeView(index) {
        this.setState({
            selectedViewIndex: index
        });
    }

    render() {
        const views = [
            <Gauge key={0} value={this.state.value} />,
            <DXLinearGauge key={1} value={this.state.value} />,
            <p key={2}>Coming Soon...</p>
        ];

        return (
            <div>
                <div>
                    <button onClick={this.changeView.bind(this, 0)}>DX React Gauge</button>
                    <button onClick={this.changeView.bind(this, 1)}>DX Gauge Wrapper</button>
                    <button onClick={this.changeView.bind(this, 2)}>DX React Custom Gauge</button>
                </div>
                <div className="dx-example-content">
                    {views.filter((view, ind) => ind === this.state.selectedViewIndex)}
                </div>
            </div>
        );
    }
}

export default connect()(App);
