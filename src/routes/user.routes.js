const { Router } = require('express');
const router = Router();

const UserController = require('../controllers/users.controller');
const auth = require('../middleware/authHandler');
const authDev = (req, _, next) => next()
const userController = new UserController();

/*
 ***************************************************************
                        USERS ROUTES
 *******************************************************************
 */

/**
 * @swagger
 *
 * /login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */

/* [TESTED] Obtener un usuario de la base de datos. */
router.get('/usuario/:userId', authDev, userController.getUser);

/* [TESTED] Obtener todos los usuarios */
router.get('/usuarios', authDev, userController.getUsers);

/* [TESTED] Obtener todos los usuarios que son laboratorio docente */
router.get('/usuarios/admin', authDev, userController.getAdmins);

/* [TESTED] Obtener todos los usuarios que son profesor o estudiante */
router.get('/usuarios/profesor', authDev, userController.getStandardUsers);

/* Registrar un nuevo usuario */
router.post('/usario/signup', userController.signUp);

/* Inicio de sesion */
router.post('/usuario/signin', userController.signIn);

/* UsbId details */
router.post('/usuario/userInfo', userController.userInfo);

/* [TESTED] Crear usuario con clave definida */
router.post('/usuario/create', auth.isLabF, userController.createUser);

/* [TESTED] Actualizar usuario */
router.put('/usuario/update/:userId', auth.isLabF, userController.updateUser);

module.exports = router;
