const { Router } = require('express');
const router = Router();

const ReservationRequestController = require('../controllers/reservationRequest.controller')
// const auth = require('../middleware/authHandler');
const auth = (req, _, next) => next()
const reservationReqController = new ReservationRequestController;

/*
 ***************************************************************
                            RESERVATIONS ROUTES
 *******************************************************************
*/

/* [TESTED] Obtener informacion de una solicitud y su horario */
router.get(
  '/solicitudes/:solicitudId',
  reservationReqController.getReservationReq
);

/* [TESTED] Obtener horario de una solicitud de reserva */
router.get(
  '/solicitudes/:solicitudId/horario',
  reservationReqController.getReservationReqSchedule
);

/* [TESTED] Obtener todas las solicitudes hechas por un usuario */
router.get(
  '/solicitudes/usuario/:userId',
  auth,
  reservationReqController.userReservationsReqs
);

/* [TESTED] Obtener todas las solicitudes correspondientes a un laboratorio. */
router.get(
  '/solicitudes/admin/:labId',
  auth,
  reservationReqController.adminReservationsRequest
);

/* [TESTED] Crear una solicitud reserva */
router.post(
  '/crear/solicitudes/reserva',
  auth,
  reservationReqController.createReservationRequest
);

/* [TESTED] Actualizar (Aceptar/rechazar) una solicitud */
router.put(
  '/solicitudes/reserva/:requestId',
  auth,
  reservationReqController.manageReservationReq
);

/* [TESTED] Eliminar solicitud de reserva de una sala */
router.delete(
  '/eliminar/solicitud/reserva/:idResquest',
  auth,
  reservationReqController.deleteReservationReq
);

module.exports = router;
