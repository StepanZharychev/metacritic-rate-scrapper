const fs = require('fs');
const gamePage = require('./scrappers/gamePage');
const { timeoutWithRandom } = require('./utils/timeout');

const url = process.argv[2];
let page = process.argv[3] || 1;

const run = async () => {
    if (url) {
        const urlEnding = url.split('/').pop();

        try {
            await fs.promises.access(`./results/${urlEnding}/pages`)
        } catch (err) {
            await fs.promises.mkdir(`./results/${urlEnding}/pages`, { recursive: true });
            await fs.promises.mkdir(`./results/${urlEnding}/users`, { recursive: true });
            await fs.promises.writeFile(`results/${urlEnding}/users/index.json`, '{}', 'utf8');
        }

        while (true) {
            console.log(`Processing page #${page}...`);
            let pageEntries = await gamePage.scrapPage(url, page);
            await timeoutWithRandom(2000, 10000);

            if (pageEntries.length) {
                await fs.promises.writeFile(`results/${urlEnding}/pages/page-${page}.json`, JSON.stringify(pageEntries), 'utf8');
                console.log(`Processed page #${page} for URL ${url}`);
            } else {
                console.error('No entries found for given configuration!');
                return;
            }

            page++;
        }
    } else {
        console.error('Please, specify URL as call parameter');
    }
};
run();
