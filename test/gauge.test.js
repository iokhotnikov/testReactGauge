import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import _ from 'lodash';

import { Gauge } from '../src';

const wrappedGauge = mount(
    <Gauge
        scale={{ customTicks: [1, 2, 3] }}
        value={2}
        valueIndicator={{
            color: 'green',
            stroke: 'red',
            strokeWidth: 1
        }}
    />
).render();

describe('Main', () => {
    const wrapper = wrappedGauge;

    it('should return svg', () => {
        expect(wrapper.find('svg')).to.have.length(1);
    });

    it('should return valid className', () => {
        expect(wrapper.find('svg').attr('class')).to.be.equal('dx-react-gauge');
    });

    it('should calculate linearScale by start/end value and width', () => {
        _.range(0, 100, 10).forEach((label, ind) => {
            const gaugeLabels = mount(
                <Gauge />)
                .render()
                .find('.axis')
                .find('text');

            expect(gaugeLabels.eq(ind).text()).to.be.equal(label.toString());
        });
    });
});

describe('Axis', () => {
    const wrappedAxis = wrappedGauge
        .find('.axis')
        .eq(0);

    it('should return only one node', () => {
        expect(wrappedGauge.find('.axis')).to.have.length(1);
    });

    it('should return g', () => {
        expect(wrappedAxis.get(0).tagName).to.be.equal('g');
    });

    describe('range container', () => {
        it('should have rangeContainer rect', () => {
            expect(wrappedAxis.find('rect')).to.have.length(1);
        });

        it('should return valid coords for rangeContainer', () => {
            expect(wrappedAxis.find('rect').attr('x')).to.equal('50');
            expect(wrappedAxis.find('rect').attr('y')).to.equal('0');
            expect(wrappedAxis.find('rect').attr('width')).to.equal('400');
            expect(wrappedAxis.find('rect').attr('height')).to.equal('5');
        });

        it('should return valid backgroundColor for rangeContainer', () => {
            expect(wrappedAxis.find('rect').attr('fill')).to.equal('gray');
        });
    });

    describe('ticks', () => {
        it('should return ticks with path', () => {
            expect(wrappedAxis.find('path')).to.have.length(3);
        });

        it('should return valid dAttribute for every path', () => {
            const paths = wrappedAxis.find('path');

            expect(paths.eq(0).attr('d')).to.equal('M50 0 L50 10');
            expect(paths.eq(1).attr('d')).to.equal('M250 0 L250 10');
            expect(paths.eq(2).attr('d')).to.equal('M450 0 L450 10');
        });

        it('should return default tick color', () => {
            expect(wrappedAxis.find('path').eq(0).attr('stroke')).to.equal('white');
        });

        it('should return default tickWidth', () => {
            expect(wrappedAxis.find('path').eq(0).attr('stroke-width')).to.equal('2');
        });
    });

    describe('labels', () => {
        it('should return ticks with labels', () => {
            expect(wrappedAxis.find('text')).to.have.length(3);
        });

        it('should be text with expected x attribute', () => {
            expect(wrappedAxis.find('text').eq(0).attr('x')).to.equal('50');
            expect(wrappedAxis.find('text').eq(1).attr('x')).to.equal('250');
            expect(wrappedAxis.find('text').eq(2).attr('x')).to.equal('450');
        });

        it('should set correct offset to labels', () => {
            expect(wrappedAxis.find('text').eq(0).attr('y')).to.equal('30');
        });
    });
});

describe('valueIndicator', () => {
    const wrappedValueIndicator = wrappedGauge.find('.valueIndicator').eq(0);
    it('should return valueIndicator', () => {
        expect(wrappedGauge.find('.valueIndicator')).to.have.length(1);
    });

    it('should return rect', () => {
        expect(wrappedValueIndicator.get(0).tagName).to.be.equal('rect');
    });

    it('should be rect with expected width and height', () => {
        expect(wrappedValueIndicator.eq(0).attr('width')).to.be.equal('200');
        expect(wrappedValueIndicator.eq(0).attr('height')).to.be.equal('10');
    });

    it('should have rect start point', () => {
        expect(wrappedValueIndicator.eq(0).attr('x')).to.be.equal('0');
        expect(wrappedValueIndicator.eq(0).attr('y')).to.be.equal('0');
    });

    it('should have selected valueIndicator color', () => {
        expect(wrappedValueIndicator.eq(0).attr('fill')).to.be.equal('green');
    });

    it('should have selected valueIndicator stroke', () => {
        expect(wrappedValueIndicator.eq(0).attr('stroke')).to.be.equal('red');
    });

    it('should have selected valueIndicator stroke-width', () => {
        expect(wrappedValueIndicator.eq(0).attr('stroke-width')).to.be.equal('1');
    });
});

describe('animation', () => {
    it('should have transform property for valueIndicatorGroup', () => {
        const wrappedGroup = wrappedGauge.find('.valueIndicatorGroup').eq(0);
        expect(wrappedGroup.eq(0).attr('transform')).to.be.equal('translate(50, 5)');
    });
});

describe('custom value indicator', () => {
    describe('circle', () => {
        const gaugeWithCircle = mount(
            <Gauge scale={{ customTicks: [1, 2, 3] }} value={2} >
                <circle cx="0" cy="0" fill="red" r={3} className="valueIndicator" />
            </Gauge>
        ).render();

        it('should have circle in group valueIndicator', () => {
            expect(gaugeWithCircle.find('.valueIndicator').get(0).parent.tagName)
                .to.be.equal('g');
            expect(gaugeWithCircle.find('.valueIndicator').get(0).tagName)
                .to.be.equal('circle');
        });
        it('should have correct group transform and circle center point', () => {
            expect(
                gaugeWithCircle
                    .find('.valueIndicator')
                    .parent('g')
                    .eq(0)
                    .attr('transform')
            ).to.be.equal('translate(250, 5)');
            expect(gaugeWithCircle.find('.valueIndicator').eq(0)
                .attr('cx')).to.be.equal('0');
            expect(gaugeWithCircle.find('.valueIndicator').eq(0)
                .attr('cy')).to.be.equal('0');
            expect(gaugeWithCircle.find('.valueIndicator').eq(0)
                .attr('fill')).to.be.equal('red');
            expect(gaugeWithCircle.find('.valueIndicator').eq(0)
                .attr('r')).to.be.equal('3');
        });
    });
    describe('rect', () => {
        const gauge = mount(
            <Gauge
                scale={{ customTicks: [1, 2, 3] }}
                value={2.5}
                size={{ width: 350, height: 100 }}
            >
                <rect
                    x="-50"
                    y="-10"
                    fill="red"
                    width={100}
                    height={10}
                    className="valueIndicator"
                />
            </Gauge>
        ).render();

        it('should have rect valueIndicator', () => {
            expect(gauge.find('.valueIndicator').get(0).tagName).to.be.equal('rect');
        });
        it('valueIndicator should have centerPoint by value', () => {
            expect(gauge.find('.valueIndicator').eq(0).attr('x')).to.be.equal('-50');
            expect(gauge.find('.valueIndicator').eq(0).attr('y')).to.be.equal('-10');
        });
    });
    describe('polygon with customize function', () => {
        const gauge = mount(
            <Gauge scale={{ customTicks: [1, 2, 3] }} value={2} size={{ width: 350, height: 100 }}>
                <polygon
                    fill="red"
                    points="100 50 150 100 200 50"
                    className="valueIndicator"
                    customize={(valueCoords, parentProps, thisProps) => {
                        const points = thisProps.points.split(' ').reduce((prev, cur, index) => {
                            if (index % 2 === 0) {
                                prev.push([cur]);
                            } else {
                                prev[prev.length - 1].push(cur);
                            }
                            return prev;
                        }, []);
                        const shiftedPoints = points.reduce((prev, cur) => {
                            const x = parseInt(cur[0], 10) + (valueCoords.x * 0.1);
                            const y = parseInt(cur[1], 10) + (valueCoords.y * 0.1);
                            return `${prev}${x} ${y} `;
                        }, '');
                        return { points: shiftedPoints.trim() };
                    }}
                />
            </Gauge>
        ).render();

        it('should have polygon valueIndicator', () => {
            expect(gauge.find('.valueIndicator').get(0).tagName).to.be.equal('polygon');
        });
        it('valueIndicator should have centerPoint by value', () => {
            expect(gauge.find('.valueIndicator').eq(0).attr('points'))
                .to.be.equal('117.5 50.5 167.5 100.5 217.5 50.5');
        });
    });
});
