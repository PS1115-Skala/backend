const { Router } = require('express');
const router = Router();

const ReservationController = require('../controllers/reservations.controller');
const auth = require('../middleware/authHandler');

const reservationController = new ReservationController;

/*
 ***************************************************************
                            RESERVATIONS ROUTES
 *******************************************************************
*/

/* [TESTED] Obtener los horarios reservados para el tipo de semanas: week = { 'todas', 'pares', 'impares', [1...12]} */
router.get("/reservas/:roomId/semana/:week", auth.isLogged, reservationController.HoursReservedByTypeWeek);

/* [TESTED] Obtener todas las reservas de una sala */
router.get("/reservas/:roomId", auth.isLogged, reservationController.asignationsFromRoom);

/* [TESTED] Obtener el horario de una reserva */
router.get("/reservas/:reservaID/horario", auth.isLogged, reservationController.asignationSchedule);

/* [TESTED] Crear una reserva (se crea por debajo la solicitud y se acepta automaticamente para ser una reserva) */
router.post("/crear/reserva", auth.isAdminLab, reservationController.createNewReservation);

router.post("/eliminar/reserva", auth.isAdminLab, reservationController.deleteReservation);


module.exports = router