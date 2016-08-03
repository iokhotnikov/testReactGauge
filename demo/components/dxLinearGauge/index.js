import React from 'react';
import dxLinearGauge from 'devextreme/viz/gauges/linear_gauge';
import DXComponent from './dxComponent';

export default function DXLinearGauge(props) {
    return (
        <DXComponent
            dxComponent={dxLinearGauge}
            {...props}
        />
    );
}
