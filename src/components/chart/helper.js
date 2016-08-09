const roundDomainMinMax = ([minDomain, maxDomain]) => {
    const numRegex = new RegExp('^[0-9][0]+$');
    const roundValue = (num, toHigh) => {
        const numChars = String(num).split('');
        let resultNum;
        if (numChars[0] === '-') {
            if (numChars.length === 2) {
                resultNum = toHigh ? ['0'] : ['-10'];
            } else if (toHigh) {
                resultNum = numChars.map((elem, index) => {
                    switch (index) {
                    case 0:
                    case 1:
                        return elem;
                    default:
                        return '0';
                    }
                });
            } else {
                resultNum = numChars.map((elem, index) => {
                    switch (index) {
                    case 0:
                        return elem;
                    case 1:
                        return String(parseInt(elem, 10) + 1);
                    default:
                        return '0';
                    }
                });
            }
        } else {
            if (numChars.length === 1) {
                resultNum = toHigh ? ['10'] : ['0'];
            } else if (toHigh) {
                resultNum = numChars.map((elem, index) => {
                    switch (index) {
                    case 0:
                        return String(parseInt(elem, 10) + 1);
                    default:
                        return '0';
                    }
                });
            } else {
                resultNum = numChars.map((elem, index) => {
                    switch (index) {
                    case 0:
                        return elem;
                    default:
                        return '0';
                    }
                });
            }
        }
        return parseInt(resultNum.join(''), 10);
    };
    const newMaxDomain = numRegex.test(String(maxDomain))
        ? maxDomain
        : roundValue(maxDomain, true);
    const newMinDomain = numRegex.test(String(minDomain))
        ? minDomain
        : roundValue(minDomain, false);
    return [newMinDomain, newMaxDomain];
};

export { roundDomainMinMax };
