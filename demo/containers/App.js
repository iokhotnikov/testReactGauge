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
            subvalueStar: 10,
            subvalueArrow: 50,
            selectedViewIndex: 0
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                value: _.random(0, 100),
                subvalueStar: _.random(0, 100),
                subvalueArrow: _.random(0, 100)
            });
        }, 2000);
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
            <Gauge
                key={2}
                value={this.state.value}
                rangeContainer={{
                    topPadding: 15
                }}
            >
                <polygon
                    points="12.5, 1.25 5,24.75 23.75, 9.75 1.25, 9.75 20, 24.75"
                    style={{ fill: 'red', fillRule: 'nonzero' }}
                    value={this.state.subvalueStar}
                    className="subValueIndicator"
                    transform="translate(-10, -18.5)"
                />
                <polygon
                    points="-10, -5 0, 5 10, -5"
                    value={this.state.subvalueArrow}
                    transform="translate(0, -10)"
                />
            </Gauge>
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
