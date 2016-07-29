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
        expect(wrappedValueIndicator.eq(0).attr('x')).to.be.equal('50');
        expect(wrappedValueIndicator.eq(0).attr('y')).to.be.equal('5');
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
