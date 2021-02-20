const config = require('./config');
const cronjob = require('./bin/cronjob');
const api = require('./api');

const main = () => {
	cronjob.initialize();
	api.initialize(config);
};

main();
