const fs = require('fs');
const CryptoJS = require('crypto-js');

const run = async () => {
   let result = {};
   const files = await fs.promises.readdir('./results');

   for (let file of files) {
      const fileData = require(`./results/${file}`);

      for (let rating of fileData) {
         const hash = CryptoJS.MD5(rating.text);
         result[hash] = rating;
      }
   }

   try {
      await fs.promises.access('./totals')
   } catch (err) {
      await fs.promises.mkdir('./totals');
   }

   await fs.promises.writeFile(`./totals/total.json`, JSON.stringify(Object.values(result)), 'utf8');
};
run();
