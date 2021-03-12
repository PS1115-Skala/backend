const { Router } = require('express');
const router = Router();

const SpecialReservationController = require('../controllers/specialReservations.controller');
const auth = require('../middleware/authHandler');
const specialResController = new SpecialReservationController;

/*
 *******************************************************************
                    SPECIAL RESERVATIONS ROUTES
 *******************************************************************
 */

/* Obtener las reservas especiales de la base de datos. */
/*
* Soporta filtrado a traves de query params con las opciones: trim (trimestre)
* y lab (laboratorio). Son opcionales, pueden llamarse 1 de los dos, los 2
* o ninguno.
*
* Ej: /special?trim=ENE-MAR2020&lab=ldac
*     /special?trim=ENE-MAR2020
*     /special?lab=ldac
*     /special
*/
router.get('/special', auth.isAdminLogged, specialResController.allSpecialReservations);

/* Obtener una reserva especial por su id */
router.get('/special/:id', auth.isAdminLogged, specialResController.specialReservationsById);

/* Crear una reserva especial asociada a un usuario */
router.post('/special/create/:userId', auth.isLogged, specialResController.createSpecialReservation);

/* Eliminar una reserva especial por su id */
router.delete('/special/:id', auth.isAdminLogged, specialResController.deleteSpecialReservation);

module.exports = router;