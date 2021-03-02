const pool = require('../data_base/pgConnect');

// Se importan metodos de autenticacion
const Auth = require('../authentication/auth.js');
const auth = new Auth();

const USER_TYPES = {
  U: 'Estudiante',
  P: 'Profesor',
  O: 'Departamento',
  LF: 'Laboratorio F',
  L: 'Laboratorio'
};

const USER_TYPE_NUMBERS = {
  U: 1111,
  P: 2222,
  O: 0000,
  LF: 4444,
  L: 3333
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
    let query = `SELECT * FROM usuario WHERE type = '4444'`;
    const requestsUsers = await pool.query(query);
    return requestsUsers || [];
  }

  async getProfesor() {
    let query = `SELECT * FROM usuario WHERE type = '2222'`;
    const profesores = await pool.query(query);
    return profesores || [];
  }

  async registerUser(usbId, name, email, type, clave) {
    let query;
    if (clave != null){
      const claveEncrypt = await auth.encryptPassword(clave);
      query = `INSERT into usuario (id, name, clave, email, type, is_active, is_verified, chief)
        values('${usbId}', '${name}', '${claveEncrypt}', '${email}', '${type}', 1, true, '${usbId}')`;
    }else{
      query = `INSERT into usuario (id,name, email, type, is_active, is_verified, chief)
        values('${usbId}', '${name}', '${email}', '${type}', 0, false, '${usbId}')`;
    }
    await pool.query(query);
  }

  async verifyUser(usbId, clave) {
    const claveEncrypt = await auth.encryptPassword(clave);
    let query = `UPDATE usuario SET clave = '${claveEncrypt}', is_active = '1', is_verified='true' WHERE id = '${usbId}'`;

    const user_updated = await pool.query(query);
    return user_updated;
  }

  async updateUser(id, data){
    try{
      let query = this.updateQueryUser(id, data);
      const user_updated = await pool.query(query);
      return user_updated;
    } catch (err) {
      throw new Error('Keys proporcionadas incorrectas.');
    }
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
    // Setup static beginning of query
    let query = ['UPDATE usuario'];
    query.push('SET');

    // Create another array storing each set command
    // and assigning a number value for parameterized query
    let set = [];
    Object.keys(update).forEach((key) => {
      set.push(`${key} = '${update[key]}'`); 
    });
    query.push(set.join(', '));

    // Add the WHERE statement to look up by id
    query.push(`WHERE id = '${id}'`);

    // Return a complete query string
    return query.join(' ');
  };
}

module.exports = UsersService;
