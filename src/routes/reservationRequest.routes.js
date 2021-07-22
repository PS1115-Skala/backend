const { Router } = require('express');
const router = Router();

const ReservationRequestController = require('../controllers/reservationRequest.controller')
const auth = require('../middleware/authHandler');

const reservationReqController = new ReservationRequestController;

/*
 ***************************************************************
                            RESERVATIONS ROUTES
 *******************************************************************
*/

/* [TESTED] Obtener informacion de una solicitud y su horario */
router.get(
  '/solicitudes/:solicitudId',
  auth.isLogged,
  reservationReqController.getReservationReq
);

/* [TESTED] Obtener horario de una solicitud de reserva */
router.get(
  '/solicitudes/:solicitudId/horario',
  auth.isLogged,
  reservationReqController.getReservationReqSchedule
);

/* [TESTED] Obtener todas las solicitudes hechas por un usuario */
router.get(
  '/solicitudes/usuario/:userId',
  auth.isBasicLogged,
  reservationReqController.userReservationsReqs
);

/* [TESTED] Obtener todas las solicitudes correspondientes a un laboratorio. */
router.get(
  '/solicitudes/admin/:labId',
  auth.isAdminLogged,
  reservationReqController.adminReservationsRequest
);

/* [TESTED] Crear una solicitud reserva */
router.post(
  '/crear/solicitudes/reserva',
  auth.isLogged,
  reservationReqController.createReservationRequest
);

/* [TESTED] Actualizar (Aceptar/rechazar) una solicitud */
router.put(
  '/solicitudes/reserva/:requestId',
  auth.isLogged,
  reservationReqController.manageReservationReq
);

/* [TESTED] Eliminar solicitud de reserva de una sala */
router.delete(
  '/eliminar/solicitud/reserva/:idResquest',
  auth.isLogged,
  reservationReqController.deleteReservationReq
);

module.exports = router;
