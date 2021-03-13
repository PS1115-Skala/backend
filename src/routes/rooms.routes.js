const { Router } = require('express');
const router = Router();

const SalaController = require('../controllers/salas.controller');
const auth = require('../middleware/authHandler');

const salasController = new SalaController();

/* [TESTED] Mostrar todas las salas existentes */
router.get('/salas', auth.isLogged, salasController.allRooms);

/* [TESTED] Mostrar datos de una Sala */
router.get('/salas/:salaId', auth.isLogged, salasController.specificRoom);

/* [TESTED] Mostrar los items que posee una sala */
router.get('/salas/:salaId/items', auth.isLogged, salasController.getRoomItems);

/* [TESTED] Mostrar todos los items menos los de que ya posee una sala */
router.get('/not/items/:roomId', auth.isLogged, salasController.itemsNoOwned);

/* [TESTED] Obtener todas las salas que son administradas por un laboratorio */
router.get('/salas/admin/:userId', auth.isLogged, salasController.adminRooms);

/* [TESTED] Obtener la imagen de una sala */
router.get('/salas/:salaId/picture', auth.isLogged, salasController.getImageRoom);

/* [TESTED] Eliminar un item de una sala en el trimestre actual */
router.delete('/salas/:salaId/:itemId', auth.isAdminLab, salasController.deleteRoomItem);

/* [TESTED] Actualizar la cantidad de un item de una sala en el trimestre actual */
router.put('/salas/:salaId/:itemId', auth.isAdminLab, salasController.updateRoomItems);

/* [TESTED] Actualizar descripcion nombre y status de una sala */
router.put('/salas/:salaId', auth.isAdminLab, salasController.updateRoom);

/* [TESTED] Crear una nueva sala */
router.post('/salas/crear', auth.isAdminLab, salasController.createRoom);

/* [TESTED] Agregar un item a la sala para el trimestre actual */
router.post('/salas/:salaId/:itemId', auth.isAdminLab, salasController.addRoomItem);

/* Subir una nueva imagen */
router.post('/salas/:salaId/picture/new', auth.isAdminLab, salasController.uploadRoomImage);

module.exports = router;
