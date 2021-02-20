/* eslint-disable no-console */
const cors = require('cors');
const cookieParser = require('cookie-parser');
const timeout = require('connect-timeout');
const express = require('express');
const helmet = require('helmet');
// const routes = require('./routes');
const {
	logErrors,
	wrapErrors,
	errorHandler
} = require('./middleware/errorHandler.js');
const notFoundHandler = require('./middleware/notFoundHandler');
const reservACapi = require('./routes/main.routes.js');

const app = express();
let server = null;

app.set('appName', 'Reservac API');
app.set('trust proxy', true);

// Maybe cause a problem with the frontend requests, remove the following line.
app.use(timeout('20s'));
app.use(
	cors({
		methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		origin: '*',
	}),
);
app.use(cookieParser());
app.use(helmet());
app.use(express.json({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// app.use('/api', routes);
reservACapi(app);

app.use(notFoundHandler);
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

const initialize = ({port, dev}) => {
	server = app.listen(port, () => {
		dev === 'development'
			? console.log(`Listening in DEVELOPMENT http://localhost:${port}`)
			: console.log(`Listening http://localhost:${port}`);
	});
};

const getServer = () => server;

module.exports = {
	initialize,
	getServer,
	app
};
