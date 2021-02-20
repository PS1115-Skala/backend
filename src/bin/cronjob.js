const { setIntervalAsync } = require('set-interval-async/dynamic');
const generator = require('./scripts/generateNextQuarter');

const initialize = () => setIntervalAsync(generator, 900000);

module.exports = {
	initialize
};
