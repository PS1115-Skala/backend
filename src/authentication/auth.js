const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config/index');

class authControl {
  async encryptPassword(password) {
    try {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    } catch (err) {
      throw err;
    }
  }

  comparePassword(password1, password2) {
    return bcrypt.compare(password1, password2);
  }

  async createToken(id, type, expireTime) {
    try {
      const token = jwt.sign({ id: id, type: type }, tokenSecret, {
        expiresIn: expireTime
      });
      return token;
    } catch (err) {
      throw err;
    }
  }

  getRequestToken = req => {
    const token = req.headers['x-access-token'];
    if (!token) {
      throw new Error('Falta Token');
    }
    return token;
  };

  async verifyAuthToken(req) {
    try {
      const token = this.getRequestToken(req);
      const decodedToken = jwt.verify(token, tokenSecret);
      return decodedToken;
    } catch (error) {
      return { type: false };
    }
  }

  verifySignInToken = async (req, usbId) => {
    const token = this.getRequestToken(req);
    try {
      const decoded = await jwt.verify(token, tokenSecret);
      if (decoded.id !== usbId) {
        throw new Error('Token no pertenece al usuario');
      }
    } catch (err) {
      throw new Error('Token invalido');
    }
  };

  async verifyToken(req, next) {
    const token = this.getRequestToken(req);
    try {
      const decoded = await jwt.verify(token, tokenSecret);
      req.userId = decoded.id;
      req.userType = decoded.type;
      next();
    } catch (err) {
      throw new Error('Token invalido');
    }
  }
}

module.exports = authControl;
