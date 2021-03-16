const UsersService = require('../services/users.service');
const usersService = new UsersService();

// Validations
const boom = require('@hapi/boom');

// Helper
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const Auth = require('../authentication/auth.js');
const auth = new Auth();

/*
    Rules To Api Rest
    status code 200 = means everything its ok
    status code 201 = means the object/item was created succesfull
    status code 400 = means bad request from the input
    status code 404 = means bad request url
    status code 500 = means something explote on the bd
*/

/*
    Controller
*/
class UserController {
  // GET an User
  async getUser(req, res) {
    const userId = req.params.userId;
    try {
      const requestFromUser = await usersService.getUser(userId);
      if (requestFromUser.rows.length) {
        res.status(200).send(requestFromUser.rows);
      } else {
        res.json(boom.notFound('missing').output.payload);
      }
    } catch (err) {
      res.status(500).json({ error: `Hubo un error en el servidor` });
    }
  }

  // GET all users
  async getUsers(req, res) {
    try {
      const requestFromUser = await usersService.getUsers();
      if (requestFromUser.rows.length) {
        res.status(200).send(requestFromUser.rows);
      } else {
        res.json(boom.notFound('missing').output.payload);
      }
    } catch (err) {
      res.status(500).json({ error: `Hubo un error en el servidor` });
    }
  }

  // GET admins users
  async getAdmins(req, res) {
    try {
      const adminUsers = await usersService.getAdminUsers();
      if (adminUsers.rows.length) {
        res.status(200).send(adminUsers.rows);
      } else {
        res.json(boom.notFound('missing').output.payload);
      }
    } catch (err) {
      res.status(500).json({ error: `Hubo un error en el servidor` });
    }
  }

  // GET teachers and students (Standard user)
  async getStandardUsers(req, res) {
    try {
      const profesor = await usersService.getProfesor();
      res.status(200).send(profesor.rows);
    } catch (err) {
      res.status(500).json({ error: `Hubo un error en el servidor` });
    }
  }

  /*
   * Authetications for users
   */

  // POST registration user
  signUp = async (req, res) => {
    try {
      const { usbId, clave1, clave2 } = req.body;
      if (clave1 !== clave2) {
        return res.status(400).json({ error: `Las claves no coinciden` });
      }
      await auth.verifySignInToken(req, usbId);
      await usersService.verifyUser(usbId, clave1);
      return res.status(204).send();
    } catch (err) {
      const err_msgs = ['Token invalido', 'Falta Token'];
      if (err_msgs.includes(err.message)) {
        return res.status(400).json({ error: err.message });
      } else {
        return res.status(500).json({ error: `Hubo un error en el servidor` });
      }
    }
  };

  // POST loggin user
  async signIn(req, res) {
    try {
      // Clave del sistema no del CAS
      const { usbId, clave } = req.body;
      const login = await usersService.loginUser(usbId, clave);
      if (login == 0) {
        return res
          .status(404)
          .json({ error: `Usuario no registrado en la base de datos` });
      }
      if (login == 1) {
        return res.status(404).json({ error: 'Clave incorrecta' });
      }
      res.json({ auth: true, token: login });
    } catch (err) {
      res.status(500).json({ error: `Hubo un error en el servidor` });
    }
  }

  // Post userInfo. Obtener detalles de la USB.
  userInfo = async (req, res) => {
    try {
      const { usbId, clave } = req.body;
      const url = 'http://usbid.dst.usb.ve/cgi/check_user.py';
      const params = new URLSearchParams();
      params.append('uid', usbId);
      params.append('pwd', clave);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          origin: 'http://usbid.dst.usb.ve'
        },
        body: params
      });
      if (!response.ok) {
        return res
          .status(response.status)
          .json({ error: 'Error en servidor CAS' });
      }
      console.log("AQUI NOOOOOOOOO?");
      const response_data = await response.json();
      response_data['userType'] = usersService.getUserType(
        response_data['uuid'],
        response_data['userType']
      );
      if (response_data['userType'] == 'null') {
        return res
          .status(400)
          .json({ error: `Usuario no permitido en el sistema` });
      }
      const userName = `${response_data['gname']} ${response_data['sname']}`;
      const userEmail = `${usbId}@usb.ve`;
      const userType = usersService.userTypeToNumber(response_data['userType']);
      const userTypeHuman = usersService.userTypeToHumanLabel(
        response_data['userType']
      );
      await usersService.checkOrCreateUser(
        usbId,
        userName,
        userEmail,
        userType,
        null
      );
      const token = await auth.createToken(usbId, userType, '1800s');
      const userResponse = {
        usbId: usbId,
        name: userName,
        userType: userTypeHuman,
        token: token
      };
      res.json(userResponse);
    } catch (err) {
      console.log(err);
      if (err.message === 'Usuario ya se encuentra activo') {
        return res.status(400).json({ error: err.message });
      }
      console.log("AQUI NOOOOOOOOO?");
      res.status(500).json({ error: `Hubo un error en el servidor` });
    }
  };

  createUser = async (req, res) => {
    try {
      const { usbId, userName, userEmail, userType } = req.body;
      const password = usbId + '123';
      await usersService
        .checkOrCreateUser(usbId, userName, userEmail, userType, password)
        .then()
        .catch(function(err) {
          throw err;
        });
      return res.status(201).json({ message: `Usuario ${usbId} creado.` });
    } catch (err) {
      if (err.message === 'Usuario ya se encuentra activo') {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: `Hubo un error en el servidor` });
    }
  };

  updateUser = async (req, res) => {
    try {
      const id = req.params.userId;
      const data = req.body;
      await usersService
        .updateUser(id, data)
        .then(() => {
          return res
            .status(200)
            .json({ message: `Usuario ${id} actualizado correctamente.` });
        })
        .catch(err => {
          throw err;
        });
    } catch (err) {

      if (err.message == 'Keys proporcionadas incorrectas.') {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: 'Hubo un error en el servidor' });
    }
  };
}

module.exports = UserController;
