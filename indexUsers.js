const fs = require('fs');
const userPage = require('./scrappers/userPage');
const { timeout } = require('./utils/timeout');

const folder = process.argv[2];

const run = async () => {
    if (folder) {
        try {
            await fs.promises.access(`./results/${folder}/pages`);
        } catch (err) {
            console.error('Specified result folder doesn\'t exist!');
        }

        const existingUsers = require(`./results/${folder}/users/index.json`);

        let processedPages = 0;
        const files = await fs.promises.readdir(`./results/${folder}/pages`);
        for (let file of files) {
            console.log(`Processing ${file}...`);
            const fileData = require(`./results/${folder}/pages/${file}`);
            let processed = 0;

            for (let rating of fileData) {
                if (!existingUsers[rating.user]) {
                    existingUsers[rating.user] = await userPage.scrapPage(rating.user);
                    await timeout(100);
                    console.log(`Checked user ${rating.user}.`);
                }

                processed++;
            }

            processedPages++;
            console.log(`Pages ${processedPages} of ${files.length}. Processed ${processed} entries from ${file}.`);
            await fs.promises.writeFile(`results/${folder}/users/index.json`, JSON.stringify(existingUsers), 'utf8');
        }
    } else {
        console.error('Please, specify folder parameter!');
    }
};
run();
