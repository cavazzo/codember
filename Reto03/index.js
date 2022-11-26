import fetch from 'node-fetch';

const getColors = async () => {
    const call = await fetch("https://codember.dev/colors.txt");
    const colors = await call.json();

    return colors;
}

const run = async () => {
    const colors = await getColors();
    let answer = {};
    let currentZebraList = [];
    let index = 0;
    let largestListLength = 0;

    colors.forEach((color) => {
        if (currentZebraList.length < 2) {
            if (currentZebraList[0] === undefined || currentZebraList[0] !== color)
                currentZebraList.push(color);
        } else {
            index = (currentZebraList.length + 1) % 2 == 0 ? 1 : 0;
            if (currentZebraList[index] !== color) {
                let prevColor = currentZebraList[currentZebraList.length - 1];
                currentZebraList = [];
                currentZebraList.push(prevColor);
            }
            currentZebraList.push(color);
        }

        if (currentZebraList.length >= largestListLength) {
            answer = { zebraCounter: currentZebraList.length, lastColor: color };
            largestListLength = currentZebraList.length;
        }
    });
    console.log(answer);
}

run();