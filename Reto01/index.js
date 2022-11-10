import fetch from 'node-fetch';

const validProps = [ 'usr', 'eme', 'psw', 'age', 'loc', 'fll' ];

const getFormattedUserDataBase = async () => {
    const database = await fetch('https://codember.dev/users.txt');
    const users = await database.text();
    return users.split('\n\n').map(u => u.replaceAll('\n', ' '));
}

const run = async () => {
    const users = await getFormattedUserDataBase();
    let totalValidUsers = 0;
    let lastValidUserName = '';

    users.forEach(u => {
        let validCount = 0;

        validProps.forEach(vp => (u.includes(vp) ? validCount++ : undefined));

        if (validCount == validProps.length) {
            const userProps = u.split(' ');
            lastValidUserName = userProps.find(up => up.includes('usr:'))?.replaceAll('usr:', '');
            totalValidUsers++;
        }
    });

    console.log(`La respuesta es: ${totalValidUsers}${lastValidUserName}`);
}

run();