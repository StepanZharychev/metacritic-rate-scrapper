module.exports.timeoutWithRandom = (maxTimeout, randomSize) => {
    return new Promise(resolve => {
        const random = Math.floor(Math.random() * randomSize);
        setTimeout(() => resolve(), Math.min(maxTimeout, random));
    });
};
module.exports.timeout = timeout => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), timeout);
    });
};
