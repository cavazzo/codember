import fetch from 'node-fetch';

const getTechnologies = async () => {
    const call = await fetch("https://codember.dev/mecenas.json");
    const technologies = await call.json();

    return technologies;
}

const battleRoyale = (players) => {
    const p = parseInt(players.length.toString(2).substring(1) + "0", 2);
    return [players[p], p];
  }

const run = async () => {
    const technologies = await getTechnologies();
    const winner = battleRoyale(technologies);
    console.log(winner);
}

run();