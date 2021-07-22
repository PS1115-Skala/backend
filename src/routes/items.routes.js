const { Router } = require('express');

const ItemController = require('../controllers/items.controller');

const auth = require('../middleware/authHandler');

const router = Router()
const itemController = new ItemController;

/*
    ***************************************************************
                            ITEMS ROUTES
    *******************************************************************
*/

/* [TESTED] Mostrar todos los items en el sistema */
router.get("/items", auth.isLogged, itemController.allItems);

/* [TESTED] Mostrar un item por su ID */
router.get("/items/:itemId", auth.isLogged, itemController.specificItem);

/* [TESTED] Crear un item */
router.post("/item", auth.isAdminLab, itemController.createItem);

/* [TESTED] Actualizar un item */
router.put("/items/:itemId", auth.isAdminLab, itemController.updateItem);

/* [TESTED] Eliminar un item */
router.delete("/items/:itemId", auth.isAdminLab, itemController.deleteItem);

module.exports = router;
