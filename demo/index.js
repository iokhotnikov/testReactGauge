import React from 'react';
import ReactDOM from 'react-dom';
import { Gauge } from '../src';

ReactDOM.render(
    <Gauge
        size={{ width: 650, height: 200 }}
        scale={{ startValue: 0, endValue: 400 }}
        value={50}
        valueIndicator={{ color: 'green' }}
    />,
    document.getElementById('root')
);
