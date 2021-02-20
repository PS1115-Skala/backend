const pool = require('../data_base/pgConnect');

// Se importan metodos de autenticacion
const Auth = require('../authentication/auth.js');
const auth = new Auth();

const USER_TYPES = {
  U: 'Estudiante',
  P: 'Profesor',
  O: 'Departamento',
  LF: 'Laboratorio F',
  L: 'Laboratorio',
};

class UsersService {
  async getUser(userId) {
    let query = `SELECT * FROM usuario WHERE id = '${userId}'`;
    const requestsUsers = await pool.query(query);
    return requestsUsers || [];
  }

  async getUsers() {
    let query = `SELECT * FROM usuario`;
    const requestsUsers = await pool.query(query);
    return requestsUsers || [];
  }

  async getAdminUsers() {
    let query = `SELECT * FROM usuario WHERE type = 'L'`;
    const requestsUsers = await pool.query(query);
    return requestsUsers || [];
  }

  async getProfesor() {
    let query = `SELECT * FROM usuario WHERE type = 'U' or type = 'P'`;
    const profesores = await pool.query(query);
    return profesores || [];
  }

  async registerUser(usbId, name, email, type) {
    let query = `INSERT into usuario (id,name, email, type, is_active, is_verified, chief)
        values('${usbId}', '${name}', '${email}', '${type}', 0, false, '${usbId}')`;
    await pool.query(query);
  }

  async verifyUser(usbId, clave) {
    const claveEncrypt = await auth.encryptPassword(clave);
    let query = `UPDATE usuario SET clave = '${claveEncrypt}', is_active = '1', is_verified='true' WHERE id = '${usbId}'`;

    const user_updated = await pool.query(query);
    return user_updated;
  }

  async loginUser(usbId, clave) {
    let query = `SELECT id, clave, type from usuario where id='${usbId}'`;
    const login = await pool.query(query);
    const user = login.rows[0];
    if (login.rows < 1) {
      return 0;
    }
    const validPassword = await auth.comparePassword(
      clave,
      login.rows[0].clave
    );
    if (!validPassword) {
      return 1;
    } else {
      const token = await auth.createToken(user.id, user.type, '18000s');
      return token;
    }
  }

  userTypeToHumanLabel = (type) => USER_TYPES[type];

  getUserType = (uuid, userType) => {
    if (userType === 'U' || userType === 'P') {
      return userType;
    }
    if (uuid.includes('labf')) {
      return 'L';
    }
    if (uuid.includes('lab')) {
      return null;
    }
  };

  checkOrCreateUser = async (usbId, name, email, type) => {
    try {
      const userExists = await this.getUser(usbId);
      // El usuario no existe y hay que crearlo
      if (userExists.rows.length == 0) {
        await this.registerUser(usbId, name, email, type);
      } else if (userExists.rows[0].is_verified == true) {
        throw 'Usuario ya se encuentra activo';
      }
    } catch (err) {
      throw err;
    }
  };
}

module.exports = UsersService;
