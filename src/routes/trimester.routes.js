const { Router } = require('express');
const router = Router();

const TrimesterController = require('../controllers/trimester.controller');
// const auth = require('../middleware/authHandler');
const auth = (req, _, next) => next()
const trimesterController = new TrimesterController();

/*
 ***************************************************************
 ************************* TRIMESTER ROUTES **********************
 *******************************************************************
 */

/* DAEMON autoUpdate Trimester (used by script updateTrimester) */
router.get('/actualizarTrimestre',auth, trimesterController.autoUpdateTrim);

/* [TESTED] GET actual trimester */
router.get('/trimestre/ultimo', trimesterController.getLastTrimester);

/* [TESTED] PUT update actual trimester  */
router.put('/trimestre/:Id', auth, trimesterController.updateTrimester);

module.exports = router;
