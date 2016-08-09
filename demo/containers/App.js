import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Gauge } from '../../src';
import DXLinearGauge from '../components/dxLinearGauge';

import { IconBathroom, IconBedroom, IconSystemTemp } from '../assets';

import './styles.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 42,
            subvalueStar: 10,
            subvalueArrow: 50,
            selectedViewIndex: 0,
            subvalueBathroom: 70,
            subvalueBedroom: 75,
            subvalueSystemTemp: 85
        };
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                value: _.random(0, 100),
                valueTemp: _.random(60, 90),
                subvalueStar: _.random(0, 100),
                subvalueArrow: _.random(0, 100),
                subvalueBathroom: this.state.subvalueBathroom + _.random(-4, 4),
                subvalueBedroom: this.state.subvalueBedroom + _.random(-4, 4),
                subvalueSystemTemp: this.state.subvalueSystemTemp + _.random(-2, 2)
            });
        }, 1500);
    }

    getColor(temp) {
        if (temp < 68) {
            return '#67bbe6';
        }
        if (temp < 75.2) {
            return '#5cafae';
        }
        if (temp < 80.6) {
            return '#f1ca2c';
        }
        return '#f16d2c';
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
            </Gauge>,
            <Gauge
                key={3}
                rangeContainer={{
                    backgroundColor: 'white',
                    topPadding: 45,
                    width: 30,
                    labelOffset: 17.5
                }}
                scale={{
                    startValue: 60,
                    endValue: 90,
                    customTicks: [60, 70, 80, 90],
                    tick: {
                        width: 4,
                        color: 'gray'
                    }
                }}
            >
                <IconBathroom
                    value={this.state.subvalueBathroom}
                    color={this.getColor(this.state.subvalueBathroom)}
                    transform={'translate(-17.5, 30)'}
                    className="subValueIndicator"
                />
                <IconBedroom
                    value={this.state.subvalueBedroom}
                    color={this.getColor(this.state.subvalueBedroom)}
                    transform={'translate(-17.5, -50)'}
                    className="subValueIndicator"
                />
                <IconSystemTemp
                    value={this.state.subvalueSystemTemp}
                    color={this.getColor(this.state.subvalueSystemTemp)}
                    transform={'translate(-17.5, -7.5)'}
                    className="subValueIndicator"
                />
            </Gauge>
        ];

        return (
            <div>
                <div>
                    <button onClick={this.changeView.bind(this, 0)}>DX React Gauge</button>
                    <button onClick={this.changeView.bind(this, 1)}>DX Gauge Wrapper</button>
                    <button onClick={this.changeView.bind(this, 2)}>DX React Simple Custom Gauge</button>
                    <button onClick={this.changeView.bind(this, 3)}>DX React Custom Gauge</button>
                </div>
                <div className="dx-example-content">
                    {views.filter((view, ind) => ind === this.state.selectedViewIndex)}
                </div>
            </div>
        );
    }
}

export default connect()(App);
