const { expect } = require('chai');
const UsersService = require('../users.service');
const userService = new UsersService();
const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../../config/index');

describe('Authenticacion Login - Success', () => {
  it('it Should return an user token with correct username and password', async () => {
    const usbId = 'labf'; // User in filler.db
    const password = '12345678';
    const token = await userService.loginUser(usbId, password);
    const verifyToken = jwt.verify(token, tokenSecret);
    expect(verifyToken).to.be.ok;
  });
});

describe('Authenticacion Login - Fail', () => {
  it('it Should return 1 with incorrect username and password', async () => {
    const usbId = 'labf'; // User in filler.db
    const password = 'incorrectPassword';
    const token = await userService.loginUser(usbId, password);
    expect(token).to.equal(1);
  });

  it('it Should return 0 with incorrect username and password', async () => {
    const usbId = 'incorrectUsername';
    const password = 'incorrectPassword';
    const token = await userService.loginUser(usbId, password);
    expect(token).to.equal(0);
  });
});

describe('Authentication Helpers - Success', () => {
  it('it Should return Estudiante with U usertype - userTypeToHumanLabel', async () => {
    const userType = 'U';
    const userTypeHuman = userService.userTypeToHumanLabel(userType);
    expect(userTypeHuman).to.equal('Estudiante');
  });

  it('it Should return Profesor with P usertype -userTypeToHumanLabel', async () => {
    const userType = 'P';
    const userTypeHuman = userService.userTypeToHumanLabel(userType);
    expect(userTypeHuman).to.equal('Profesor');
  });

  it('it Should return Departamento with O usertype - userTypeToHumanLabel', async () => {
    const userType = 'O';
    const userTypeHuman = userService.userTypeToHumanLabel(userType);
    expect(userTypeHuman).to.equal('Departamento');
  });

  it('it Should return Laboratorio F with LF usertype - userTypeToHumanLabel', async () => {
    const userType = 'LF';
    const userTypeHuman = userService.userTypeToHumanLabel(userType);
    expect(userTypeHuman).to.equal('Laboratorio F');
  });

  it('it Should return Laboratorio with L usertype - userTypeToHumanLabel', async () => {
    const userType = 'L';
    const userTypeHuman = userService.userTypeToHumanLabel(userType);
    expect(userTypeHuman).to.equal('Laboratorio');
  });

  it('it Should return 1111 with U usertype - userTypeToNumber', async () => {
    const userType = 'U';
    const userTypeNumber = userService.userTypeToNumber(userType);
    expect(userTypeNumber).to.equal(1111);
  });

  it('it Should return 2222 with P usertype - userTypeToNumber', async () => {
    const userType = 'P';
    const userTypeNumber = userService.userTypeToNumber(userType);
    expect(userTypeNumber).to.equal(2222);
  });

  it('it Should return 0000 with O usertype - userTypeToNumber', async () => {
    const userType = 'O';
    const userTypeNumber = userService.userTypeToNumber(userType);
    expect(userTypeNumber).to.equal(0000);
  });

  it('it Should return 4444 with LF usertype - userTypeToNumber', async () => {
    const userType = 'LF';
    const userTypeNumber = userService.userTypeToNumber(userType);
    expect(userTypeNumber).to.equal(4444);
  });

  it('it Should return 3333 with L usertype - userTypeToNumber', async () => {
    const userType = 'L';
    const userTypeNumber = userService.userTypeToNumber(userType);
    expect(userTypeNumber).to.equal(3333);
  });

  it('it Should return U with U usertype - getUserType', async () => {
    // uuid nombre de usuario obtenido en el CAS USB.
    // UserType que se obtiene del CAS USB.
    const uuid = '13-11223';
    const userTypeUsb = 'U';
    const userType = userService.getUserType(uuid, userTypeUsb);
    expect(userType).to.equal('U');
  });

  it('it Should return P with P usertype - getUserType', async () => {
    // uuid nombre de usuario obtenido en el CAS USB.
    // UserType que se obtiene del CAS USB.
    const uuid = 'cchang';
    const userTypeUsb = 'P';
    const userType = userService.getUserType(uuid, userTypeUsb);
    expect(userType).to.equal('P');
  });

  it('it Should return L with labf-* username - getUserType', async () => {
    // uuid nombre de usuario obtenido en el CAS USB.
    // UserType que se obtiene del CAS USB.
    const uuid = 'labf-laboratoriobonito';
    const userTypeUsb = ''; // No se utiliza para la verificacion.
    const userType = userService.getUserType(uuid, userTypeUsb);
    expect(userType).to.equal('L');
  });

  it('it Should return null with lab-* username - getUserType', async () => {
    // uuid nombre de usuario obtenido en el CAS USB.
    // UserType que se obtiene del CAS USB.
    const uuid = 'lab-deberiafallar';
    const userTypeUsb = ''; // No se utiliza para la verificacion.
    const userType = userService.getUserType(uuid, userTypeUsb);
    expect(userType).to.equal(null);
  });
});

describe('SignUp Create User', () => {
  it('it Should throw error with an existent user', async () => {
    // User from filler.db
    const usbId = '12-10273';
    try {
      await userService.checkOrCreateUser(usbId, '', '', '', '');
    } catch (err) {
      expect(err).to.be.an('error');
      expect(err.message).to.equal('Usuario ya se encuentra activo');
    }
  });

  it('it Should create an user with a new user', async () => {
    // Aca estamos probando que podemos registrar a un usuario
    // y ademas que podemos obtenerlo de manera exitosa
    const usbId = '13-11223';
    const name = 'Manuel Rodriguez';
    const email = '13-11223@usb.ve';
    const type = userService.userTypeToNumber('U');
    const clave = 'esto es una clave';
    await userService.checkOrCreateUser(usbId, name, email, type, clave);
    let registeredUser = await userService.getUser(usbId);
    registeredUser = registeredUser.rows[0];
    expect(registeredUser.id).to.equal(usbId);
    expect(registeredUser.name).to.equal(name);
    expect(registeredUser.email).to.equal(email);
    expect(registeredUser.type).to.equal(type);
    expect(registeredUser.is_active).to.equal(1);
    expect(registeredUser.is_verified).to.equal(true);
    expect(registeredUser.chief).to.equal(usbId);
  });
});
