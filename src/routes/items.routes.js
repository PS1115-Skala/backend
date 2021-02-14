const { Router } = require('express');

const ItemController = require('../controllers/items.controller');
const auth = require('../middleware/auth');

const router = Router()
const itemController = new ItemController;

/*
    ***************************************************************
                            ITEMS ROUTES
    *******************************************************************
*/

/* [TESTED] Mostrar todos los items en el sistema */
router.get("/items", itemController.allItems);

/* [TESTED] Mostrar un item por su ID */
router.get("/items/:itemId", itemController.specificItem);

/* [TESTED] Crear un item */
router.post("/item", auth, itemController.createItem);

/* [TESTED] Actualizar un item */
router.put("/items/:itemId", auth, itemController.updateItem);

/* [TESTED] Eliminar un item */
router.delete("/items/:itemId", auth, itemController.deleteItem);

module.exports = router;
