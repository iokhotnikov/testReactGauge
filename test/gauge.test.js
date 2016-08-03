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
            expect(wrappedAxis
                .find('rect')
                .parent('g')
                .parent('g')
                .eq(0)
                .attr('transform')
            ).to.equal('translate(50,5)');
            expect(wrappedAxis.find('rect').attr('x')).to.equal('0');
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
            expect(paths.eq(0).attr('d')).to.equal('M0 0 L0 10');
            expect(paths.eq(1).attr('d')).to.equal('M200 0 L200 10');
            expect(paths.eq(2).attr('d')).to.equal('M400 0 L400 10');
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
            expect(wrappedAxis.find('text').eq(0).attr('x')).to.equal('0');
            expect(wrappedAxis.find('text').eq(1).attr('x')).to.equal('200');
            expect(wrappedAxis.find('text').eq(2).attr('x')).to.equal('400');
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
        expect(wrappedGroup.eq(0).attr('transform')).to.be.equal('translate(0, 5)');
    });
});

describe('subValueIndicator', () => {
    describe('circle', () => {
        const gaugeWithCircle = mount(
            <Gauge>
                <circle cx="0" cy="0" fill="red" r={3} className="subValueIndicator" />
            </Gauge>
        ).render();

        it('should have circle in group', () => {
            const valueIndicator = gaugeWithCircle.find('.subValueIndicator').get(0);
            expect(valueIndicator.parent.tagName).to.be.equal('g');
            expect(valueIndicator.tagName).to.be.equal('circle');
        });
        it('should have attributes from tag', () => {
            const valueIndicator = gaugeWithCircle.find('.subValueIndicator').eq(0);
            expect(valueIndicator.attr('cx')).to.be.equal('0');
            expect(valueIndicator.attr('cy')).to.be.equal('0');
            expect(valueIndicator.attr('fill')).to.be.equal('red');
            expect(valueIndicator.attr('r')).to.be.equal('3');
        });
    });

    describe('rect', () => {
        const gauge = mount(
            <Gauge>
                <rect
                    x="-50"
                    y="-10"
                    fill="red"
                    width={100}
                    height={10}
                    className="subValueIndicator"
                />
            </Gauge>
        ).render();
        const indicator = gauge.find('.subValueIndicator').eq(0);
        it('should have rect subValueIndicator', () => {
            expect(gauge.find('.subValueIndicator').get(0).tagName).to.be.equal('rect');
        });
        it('should have attributes from tag', () => {
            expect(indicator.attr('x')).to.be.equal('-50');
            expect(indicator.attr('y')).to.be.equal('-10');
            expect(indicator.attr('fill')).to.be.equal('red');
            expect(indicator.attr('width')).to.be.equal('100');
            expect(indicator.attr('height')).to.be.equal('10');
        });
    });

    describe('with customize function', () => {
        const customShiftPoints = (coodr, valueCoords, index) => {
            if (index % 2 === 0) {
                return (parseInt(coodr, 10) + (valueCoords.x * 0.1));
            }
            return coodr;
        };
        const customize = (valueXY, parentProps, thisProps) => {
            const points =
                thisProps.points
                            .split(' ')
                            .map((coord, index) => customShiftPoints(coord, valueXY, index))
                        .reduce((prev, cur) => `${prev}${cur} `, '')
                        .trim();
            return { points };
        };
        const gauge = mount(
            <Gauge
                scale={{ customTicks: [1, 2, 3] }}
                value={2}
                size={{ width: 350, height: 100 }}
                valueIndicator={{ on: false }}
            >
                <polygon
                    points="100 50 150 100 200 50"
                    className="subValueIndicator"
                    customize={customize}
                />
            </Gauge>
        ).render();
        it('should have same tag', () => {
            expect(gauge.find('.subValueIndicator').get(0).tagName).to.be.equal('polygon');
        });
        it('should have centerPoint by value', () => {
            expect(gauge.find('.subValueIndicator').eq(0).attr('points'))
                .to.be.equal('114 50 164 100 214 50');
        });
    });

    describe('with valueIndicator', () => {
        const gauge = mount(
            <Gauge>
                <circle className="subValueIndicator" />
            </Gauge>
        ).render();
        const subValueIndicator = gauge.find('.subValueIndicator').get(0);
        const valueIndicator = gauge.find('.valueIndicator').get(0);
        it('should have circle subValueIndicator and rect valueIndicator', () => {
            expect(subValueIndicator.tagName).to.be.equal('circle');
            expect(valueIndicator.tagName).to.be.equal('rect');
        });
    });

    describe('multiple', () => {
        const gauge = mount(
            <Gauge>
                <circle r={3} className="subValueIndicator" />
                <rect className="subValueIndicator" />
            </Gauge>
        ).render();
        const subvalueIndicators = gauge.find('.subValueIndicator');
        it('should have multiple figures on gauge', () => {
            expect(subvalueIndicators.get(0).tagName).to.be.equal('circle');
            expect(subvalueIndicators.get(1).tagName).to.be.equal('rect');
        });
    });
});
