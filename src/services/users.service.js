const pool = require('../data_base/pgConnect');
const { USER_TYPES, USER_TYPE_NUMBERS } = require('../utils/constants')

// Se importan metodos de autenticacion
const Auth = require('../authentication/auth.js');
const auth = new Auth();
class UsersService {
  async getUser(userId) {
    const query = `SELECT id, name, email, type, is_active, is_verified, chief FROM usuario WHERE id = $1`;
    const requestsUsers = await pool.query(query, [userId]);
    return requestsUsers;
  }

  async getUsers() {
    const query = `SELECT id, name, email, type, is_active, is_verified, chief FROM usuario`;
    const requestsUsers = await pool.query(query);
    return requestsUsers;
  }

  async getAdminUsers() {
    const query = `SELECT id, name, email, type, is_active, is_verified, chief FROM usuario WHERE type = '3333'`;
    const requestsUsers = await pool.query(query);
    return requestsUsers;
  }

  async getProfesor() {
    const query = `SELECT id, name, email, type, is_active, is_verified, chief FROM usuario WHERE type = '2222'`;
    const profesores = await pool.query(query);
    return profesores;
  }

  async registerUser(usbId, name, email, type, clave) {
    let query;
    let values;
    if (clave != null) {
      const claveEncrypt = await auth.encryptPassword(clave);
      query = `INSERT into usuario (id, name, clave, email, type, is_active, is_verified, chief)
        values($1, $2, $3, $4, $5, 1, true, $6)`;
      values = [usbId, name, claveEncrypt, email, type, usbId];
    } else {
      query = `INSERT into usuario (id,name, email, type, is_active, is_verified, chief)
        values($1, $2, $3, $4, 0, false, $5)`;
      values = [usbId, name, email, type, usbId];
    }
    await pool.query(query, values);
  }

  async verifyUser(usbId, clave) {
    const claveEncrypt = await auth.encryptPassword(clave);
    const query = `UPDATE usuario SET clave = $1, is_active = '1', is_verified='true' WHERE id = $2`;
    const values = [claveEncrypt, usbId];
    const user_updated = await pool.query(query, values);
    return user_updated;
  }

  async updateUser(id, data) {
    try {
      const { query, values } = this.updateQueryUser(id, data);
      const user_updated = await pool.query(query, values);
      return user_updated;
    } catch (err) {
      throw new Error('Keys proporcionadas incorrectas.');
    }
  }

  async loginUser(usbId, clave) {
    let query = `SELECT id, clave, type from usuario where id=$1`;
    const login = await pool.query(query,[usbId]);
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

  userTypeToHumanLabel = type => USER_TYPES[type];

  userTypeToNumber = type => USER_TYPE_NUMBERS[type];

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

  checkOrCreateUser = async (usbId, name, email, type, clave) => {
    try {
      const userExists = await this.getUser(usbId);
      // El usuario no existe y hay que crearlo
      if (userExists.rows.length == 0) {
        await this.registerUser(usbId, name, email, type, clave);
      } else if (userExists.rows[0].is_verified == true) {
        throw 'Usuario ya se encuentra activo';
      }
    } catch (err) {
      throw err;
    }
  };

  updateQueryUser(id, update) {
    let query = ['UPDATE usuario'];
    let set = [];
    let values = [];

    query.push('SET');

    Object.keys(update).forEach((key,index) => {
      set.push(`${key} = $${index+1}`);
      values.push(update[key]);
    });

    query.push(set.join(', '));
    query.push(`WHERE id = $${Object.keys(update).length + 1}`);
    values.push(id);
    
    return {query: query.join(' '), values: values };
  };
}

module.exports = UsersService;
