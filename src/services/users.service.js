const pool = require('../data_base/pgConnect');

// Se importan metodos de autenticacion
const Auth = require('../authentication/auth.js');
const auth = new Auth();

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
        values('${usbId}', '${name}', '${email}', ${type}, 0, false '${usbId}')`;

    await pool.query(query);
    const token = await auth.createToken(usbId, type);
    return token;
  }

  async verifyUser(usbId, clave) {
    const claveEncrypt = await auth.encryptPassword(clave);
    let query = `UPDATE usuario SET clave = '${claveEncrypt}', is_active = '1', is_verified='true' WHERE id = ${usbId}`;

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
      const token = await auth.createToken(user.id, user.type);
      return token;
    }
  }
}

module.exports = UsersService;
