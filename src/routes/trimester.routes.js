const { Router } = require('express');
const router = Router();

const TrimesterController = require('../controllers/trimester.controller');
const auth = require('../middleware/authHandler');

const trimesterController = new TrimesterController();

/* DAEMON autoUpdate Trimester (used by script updateTrimester) */
// router.get('/actualizarTrimestre', auth.isLabF, trimesterController.autoUpdateTrim);

/* [TESTED] GET actual trimester */
router.get('/trimestre/ultimo', auth.isLogged, trimesterController.getLastTrimester);

/* [TESTED] GET todo los trimestres existentes */
router.get('/trimestre/todos', auth.isAdminLogged, trimesterController.getAllTrimesters);

/* [TESTED] PUT update actual trimester  */
router.put('/trimestre/:Id', auth.isLabF, trimesterController.updateTrimester);

module.exports = router;
