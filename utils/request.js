const request = require('request-promise-native');
const { timeout } = require('./timeout');

module.exports.getWithRetry = async function self(url) {
    try {
        return await request.get(url);
    } catch (err) {
        await timeout(10000);
        return await self(url);
    }
};
