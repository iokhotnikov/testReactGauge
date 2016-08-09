import React from 'react';
import { VictoryAxis, VictoryLine } from 'victory-chart';
import { roundDomainMinMax } from './helper.js';

import _ from 'lodash';

const getSeries = (props) => {
    const series = {};
    Object.keys(props.data).map((key) =>
        Object.keys(props.data[key]).map((seriesKey) => {
            if (series[seriesKey] === undefined) {
                series[seriesKey] = [];
            }
            return series[seriesKey].push({ x: new Date(key), y: props.data[key][seriesKey] });
        })
    );
    return series;
};

const getSeriesDomains = (series) =>
    Object.keys(series)
        .map((key) => {
            const min = _.min(series[key].map((data) => data.y));
            const max = _.max(series[key].map((data) => data.y));
            return {
                key,
                domain: [min, max]
            };
        }
    );

const getDomainRange = (seriesDomain) => {
    const range = Math.abs(seriesDomain.domain[1] - seriesDomain.domain[0]);
    return {
        key: seriesDomain.key,
        range
    };
};

const checkMultiline = (domainRanges, series) => {
    const maxRange = _.max(domainRanges.map((elem) => elem.range));
    const minRange = _.min(domainRanges.map((elem) => elem.range));

    let multiAxisSeries;
    if (maxRange / (minRange + 1) > 10) {
        const key = _.filter(domainRanges, (object) => object.range === maxRange)[0].key;
        multiAxisSeries = {
            key,
            values: series[key]
        };
    }
    return multiAxisSeries;
};

const getMainAxisYDomain = (series, multiAxisSeries) => {
    const values = _.flatten(
        _.filter(Object.keys(series), (seriesKey) =>
            multiAxisSeries === undefined || seriesKey !== multiAxisSeries.key
        ).map((seriesKey) => series[seriesKey].map((elem) => elem.y))
    );
    const minDomain = _.min(values);
    const maxDomain = _.max(values);
    return roundDomainMinMax([minDomain, maxDomain]);
};


const getTicksByDomainAndCount = (domain, tickCount) => {
    const step = 100 / tickCount;
    return _.range(0, 110, step)
        .map((number) => Math.ceil(((domain[1] - domain[0]) * number / 100) + domain[0]));
};

const Chart = (props) => {
    if (props.data === undefined) {
        return <svg />;
    }
    const heightWithoutText = props.height - 40;
// process data to series, check what need multiaxis by values
    const series = getSeries(props);
    const seriesDomains = getSeriesDomains(series);
    const domainRanges = seriesDomains.map((seriesDomain) => getDomainRange(seriesDomain));
    const multiAxisSeries = checkMultiline(domainRanges, series);
// round domains
    const xDomain = [
        _.min(Object.keys(props.data).map((data) => new Date(data))),
        _.max(Object.keys(props.data).map((data) => new Date(data)))
    ];
    const yDomain = getMainAxisYDomain(series, multiAxisSeries);
// custom ticks
    const tickCount = 10;
    const standartTicks = getTicksByDomainAndCount(yDomain, tickCount);
    let axis;
// custom visibility
    const axisStyle = {
        axis: { stroke: 'black', strokeWidth: 0 },
        tickLabels: { fontSize: 12 },
        grid: { stroke: 'grey', strokeWidth: 1, opacity: 0.3 }
    };
    const colors = ['cornflowerblue', '#333', 'rgb(144, 237, 125)'];

// create lines
    const lines = Object.keys(series).map((key, index) => {
        let domain = { x: xDomain, y: yDomain };
// check multiline
        if (multiAxisSeries && multiAxisSeries.key === key) {
            const multiAxisValues = multiAxisSeries.values.map((elem) =>
              elem.y
            );
            domain.y = roundDomainMinMax([_.min(multiAxisValues), _.max(multiAxisValues)]);
            const customTicks = getTicksByDomainAndCount(domain.y, tickCount);
            axis = (
                <VictoryAxis
                    width={props.width}
                    height={heightWithoutText}
                    dependent
                    style={axisStyle}
                    tickValues={customTicks}
                    domain={domain.y}
                    orientation="right"
                    standalone={false}
                />
            );
        }

        return (<VictoryLine
            width={props.width}
            height={heightWithoutText}
            key={key}
            style={{
                data: {
                    stroke: colors[index % 3],
                    strokeWidth: 2,
                    strokeLinejoin: 'round'
                }
            }}
            interpolation="linear"
            domain={domain}
            scale={{ x: 'time', y: 'linear' }}
            data={_.filter(series[key], (elem) => elem.x >= new Date(2016, 5, 19))}
            standalone={false}
        />
        );
    });
    // create standart chart markup
    return (<svg width={props.width} height={props.height}>
        <VictoryAxis
            width={props.width}
            height={heightWithoutText}
            // stroke-linejoin="round"
            style={{
                axis: { stroke: 'black', strokeWidth: 0 },
                ticks: { stroke: 'grey', size: 10, opacity: 0.7 },
                tickLabels: {
                    angle: -50,
                    verticalAnchor: 'middle',
                    textAnchor: 'end',
                    fontSize: 10
                },
                axisLabel: { transform: 'translate(0,70)' },
                data: {
                    strokeWidth: 2
                },
                labels: {
                    fontSize: 12
                }
            }}
            tickCount={70}
            scale="time"
            domain={xDomain}
            orientation="bottom"
            label="date"
            standalone={false}
            tickFormat={
                (x) => {
                    const date = new Date(x);
                    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
                }
            }
        />

        <VictoryAxis
            type={"grid"}
            width={props.width}
            height={heightWithoutText}
            dependent
            style={axisStyle}
            domain={yDomain}
            tickValues={standartTicks}
            orientation="left"
            standalone={false}
        />
        {axis}
        {lines}
    </svg>);
};
Chart.propTypes = {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    data: React.PropTypes.object
};

Chart.defaultProps = {
    width: 1902,
    height: 500
};
export default Chart;
