const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

const removeInvalidPasswords = (range) => {
    let result = [];
    const elements = range.map(x => (x + "")).filter(y => y.includes("5"));

    elements.forEach(el => {
        const arr = el.split("").filter(a => a == "5");

        if (arr.length > 1) {
            result = [ ...result, el ];
        }
    });

    return result;
}

const run = () => {
    const passwordRange = range(11098, 98123);
    const posiblePasswords = removeInvalidPasswords(passwordRange);
    let validPasswords = [];

    posiblePasswords.forEach(pp => {
        let countGreaterOrEqual = 0;
        const digits = pp.split("");
        
        digits.forEach((d, index) => {
            const currentDigit = d;
            const prevDigit = pp[(index - 1)];

            if ((parseInt(currentDigit) >= parseInt(prevDigit)) || prevDigit === undefined) {
                countGreaterOrEqual++;
            }
        });

        if (countGreaterOrEqual === pp.length) {
            validPasswords = [ ...validPasswords, pp ];
        }
    });

    const result = {
        totalValidPasswords: validPasswords.length,
        targetPassword: validPasswords[55],
        password: `${validPasswords.length}-${validPasswords[55]}`
    }

    console.log(result);
}

run();