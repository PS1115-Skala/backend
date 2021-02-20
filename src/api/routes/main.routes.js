const express = require('express');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const options = require('../../swagger/swaggerDef');
const swaggerSpec = swaggerJSDoc(options);

/* Routes */
const trimesterRoutes = require('./trimesters.routes');
const itemRoutes = require('./items.routes');
const roomRoutes = require('./rooms.routes');
const reservationRoutes = require('./reservations.routes');
const reservationRequestRoutes = require('./reservationRequests.routes');
const roomRequestRoutes = require('./roomRequests.routes');
const userRoutes = require('./users.routes');
const subjectRoutes = require('./subjects.routes');
const metricRoutes = require('./metrics.routes');

function reservACapi(app) {
	// Prefix Route
	const router = express.Router();
	app.use('/api/', router);
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	/*
    ***************************************************************
                            TRIMESTER ROUTES
    *******************************************************************
*/

	router.use(trimesterRoutes);
	/*
    ***************************************************************
                            ITEMS ROUTES
    *******************************************************************
*/

	router.use(itemRoutes);

	/*
    ***************************************************************
                            ROOMS ROUTES
    *******************************************************************
*/

	router.use(roomRoutes);

	/*
    ***************************************************************
                            RESERVATIONS ROUTES
    *******************************************************************
*/

	router.use(reservationRoutes);

	/*
    ***************************************************************
                            RESERVATIONS REQUEST ROUTES
    *******************************************************************
*/

	router.use(reservationRequestRoutes);

	/*
    ***************************************************************
                            ROOM REQUEST ROUTES
    *******************************************************************
*/

	router.use(roomRequestRoutes);

	/*
    ***************************************************************
                            USERS ROUTES
    *******************************************************************
*/

	router.use(userRoutes);

	/*
    ***************************************************************
                            SUBJECTS ROUTES
    *******************************************************************
*/

	router.use(subjectRoutes);

	/*
    ***************************************************************
                            METRICS ROUTES
    *******************************************************************
*/

	router.use(metricRoutes);
}

module.exports = reservACapi;
