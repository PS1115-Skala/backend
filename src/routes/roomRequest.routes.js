const { Router } = require('express');
const router = Router();

const RoomRequestController = require('../controllers/roomRequest.controller')
// const auth = require('../middleware/authHandler');
const auth = (req, _, next) => next()
const roomReqController = new RoomRequestController;

/*
 ***************************************************************
                         ROOM REQUEST ROUTES
 *******************************************************************
*/
// [CAMBIAR ESTA RUTA MIERDERA, QUE CARAJO EL /CREAR/? CARLOS - ACTUALIZAR CON FRONT]
/* Obtener solicitudes de sala por parte de un usuario en especifico */
router.get(
  '/sala/solicitudes/crear/:userId',
  auth,
  roomReqController.getRoomReqFromAdminLab
);

/* [TESTED] Obtener todas las room_request */
router.get('/labf/solicitudes', auth, roomReqController.getAllRoomRequest);

/* [TESTED] Actualizar status de una solicitud de creacion de sala (crear en caso de aceptar y no existir) */
router.put(
  '/sala/solicitudes/:roomRequestId',
  auth,
  roomReqController.manageRoomRequest
);

/* [TESTED] Crear una solicitud de sala */
router.post(
  '/sala/solicitudes/crear/:userId',
  auth,
  roomReqController.createRoomRequest
);

module.exports = router;