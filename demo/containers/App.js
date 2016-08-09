import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Gauge } from '../../src';
import DXLinearGauge from '../components/dxLinearGauge';
import './styles.css';
import Chart from '../../src/components/chart/';
import Highcharts from 'highcharts';
import $ from 'jquery';

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
        const self = this;
        $.getJSON('http://localhost:8080/demo/testData.json',
            data => {
                self.setState({ data });

                // highcharts, data process
                const series = {};
                Object.keys(data).map((key) =>
                    Object.keys(data[key]).map((seriesKey) => {
                        if (series[seriesKey] === undefined) {
                            series[seriesKey] = [];
                        }
                        series[seriesKey].push({ x: new Date(key), y: data[key][seriesKey] });
                        return 0;
                    })
                );
                const resultData = Object.keys(series).map((seriesKey, index) => {
                    const seriesData = series[seriesKey];
                    return {
                        name: seriesKey,
                        data: seriesData,
                        turboThreshold: 0,
                        yAxis: index >= 1 ? 1 : index
                    };
                });
                Highcharts.chart('highcharts-content', {
                    series: resultData,
                    xAxis: {
                        type: 'datetime'
                    },
                    yAxis: [
                        {
                            opposite: true
                        },
                        {}
                    ]
                });
            });
    }

    changeView(index) {
        this.setState({
            selectedViewIndex: index
        });
    }

    render() {
        const width = window.innerWidth * 0.96;
        const views = [
            <Chart key={0} data={this.state.data} width={width} />,
            <DXLinearGauge key={1} value={this.state.value} />,
            <Gauge
                key={2}
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
                <div id="highcharts-content">
                </div>
            </div>
        );
    }
}

export default connect()(App);
