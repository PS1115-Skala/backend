// ****************************************************************************************************
// ****************************************************************************************************
// ****************************************************************************************************
/* ****************************************************************************************************

This file belongs to the new version of the API (v2), if you don't know what you are doing, DO NOT TOUCH IT.

**************************************************************************************************** */
// ****************************************************************************************************
// ****************************************************************************************************
// ****************************************************************************************************

const router = require('express').Router();
const daemons = require('./daemons.routes');
const items = require('./items.routes');
const metrics = require('./metrics.routes');
const reservationRequests = require('./reservationRequests.routes');
const reservations = require('./reservations.routes');
const roomRequests = require('./roomRequests.routes');
const rooms = require('./rooms.routes');
const sessions = require('./sessions.routes');
const subjects = require('./subjects.routes');
const trimesters = require('./trimesters.routes');
const users = require('./users.routes');

router.use('/daemons', daemons);
router.use('/items', items);
router.use('/metrics', metrics);
router.use('/solicitudes', reservationRequests);
router.use('/reservas', reservations);
router.use('/sala', roomRequests);
router.use('/salas', rooms);
router.use('/sessions', sessions);
router.use('/subjects', subjects);
router.use('/trimestre', trimesters);
router.use('/usuarios', users);
router.use('/salas', rooms);
router.use('/sessions', sessions);
router.use('/subjects', subjects);
router.use('/trimestre', trimesters);
router.use('/usuarios', users);

module.exports = router;
