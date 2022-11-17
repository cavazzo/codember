import fetch from 'node-fetch';
import { asciiTable } from './ascii.table.js';

const getCryptedMessages = async () => {
    const call = await fetch("https://codember.dev/encrypted.txt");
    const message = await call.text();

    return message.split(" ");
}

const getAsciiTable = () => {
    return asciiTable;
}

async function* messageGenerator() {
    const messages = await getCryptedMessages();

    for (let i = 0; i < messages.length; i++) {
        yield messages[i]
    }
}

const run = async () => {
    const messages = messageGenerator();
    const ASCII_TABLE = getAsciiTable();
    let decodedMessage = "";
    let message = await messages.next();
    let currentSubstring = 0;
    let totalLengthMessage = message.value.length;
    let done = false;

    do {
        let unkAscii = "";

        if (currentSubstring === totalLengthMessage) {
            decodedMessage += " ";
            currentSubstring = 0;
            message = await messages.next();
            totalLengthMessage = message.value?.length;
            done = message.done;
        }

        if (!done) {
            if(parseInt(message.value.substring(currentSubstring, (currentSubstring + 3))) <= parseInt(ASCII_TABLE.at(-1).decimal)) {
                unkAscii = message.value.substring(currentSubstring, (currentSubstring + 3));
            }
            else {
                unkAscii = message.value.substring(currentSubstring, (currentSubstring + 2));
            }
            
            decodedMessage += ASCII_TABLE.find(ac => ac.decimal === parseInt(unkAscii))?.character;
            currentSubstring = currentSubstring + unkAscii.length;
        }
    } while (!done);

    console.log(decodedMessage);
}

run();