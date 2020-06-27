const fs = require('fs');
const CryptoJS = require('crypto-js');

const folder = process.argv[2];

const run = async () => {
    if (folder) {
        try {
            await fs.promises.access(`./results/${folder}/pages`);
        } catch (err) {
            console.error('Specified result folder doesn\'t exist!');
            return;
        }

        let result = [];
        const files = await fs.promises.readdir(`./results/${folder}/pages`);
        const userData = require(`./results/${folder}/users/index.json`);

        for (let file of files) {
            const fileData = require(`./results/${folder}/pages/${file}`);

            for (let entry of fileData) {
                result.push({ ...entry, userData: userData[entry.user] });
            }
        }

        try {
            await fs.promises.access('./totals')
        } catch (err) {
            await fs.promises.mkdir('./totals');
        }

        await fs.promises.writeFile(`./totals/index.json`, JSON.stringify(result), 'utf8');
    } else {
        console.error('Please, specify folder parameter!');
    }
};
run();
