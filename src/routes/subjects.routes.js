const { Router } = require('express');
const router = Router();

const SubjectsController = require('../controllers/subjects.controller');
const auth = require('../middleware/authHandler');

const subjectController = new SubjectsController();

/* [TESTED] Obtener todas las materias en el sistema */
router.get('/subjects', auth.isLogged ,subjectController.getSubjects);

module.exports = router;
