//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
var expect = chai.expect;
const jwt = require('jsonwebtoken');
const { tokenSecret } = require('../config/index');
const Auth = require('../authentication/auth');
const auth = new Auth();
var fetchMock = require('fetch-mock');

chai.use(chaiHttp);

const {
  setupStudentToken,
  setupLabfToken
} = require('../utils/helpers/setupTokens');

/*
USER
*/
describe('User', () => {
  let labfToken;
  let studentToken;

  before(async () => {
    labfToken = await setupLabfToken();
    studentToken = await setupStudentToken();
  });
  /*
   * Test the /POST about users creation
   */
  describe('POST /api/usuario/create', () => {
    it('it should create a user "00-00000" with a pass defined', done => {
      const user = {
        usbId: '00-00000',
        userName: 'Armando Prueba',
        userEmail: '00-00000@usb.ve',
        userType: 1111
      };
      chai
        .request(app)
        .post('/api/usuario/create')
        .set('x-access-token', labfToken)
        .send(user)
        .end((err, res) => {
          // need status 200
          expect(res).to.have.status(201);
          expect(res.body.message).to.have.equal(
            `Usuario ${user.usbId} creado.`
          );
          done();
        });
    });

    it('it should fail when trying to create a user "00-00000" that already exists', done => {
      const user = {
        usbId: '00-00000',
        userName: 'Armando Prueba',
        userEmail: '00-00000@usb.ve',
        userType: 1111
      };
      chai
        .request(app)
        .post('/api/usuario/create')
        .set('x-access-token', labfToken)
        .send(user)
        .end((err, res) => {
          // need status 400
          expect(res).to.have.status(400);
          expect(res.body.error).to.have.equal(
            `Usuario ya se encuentra activo`
          );
          done();
        });
    });

    it('it should fail when passing inconsistent data', done => {
      const user = {
        usbId: '11223'
      };
      chai
        .request(app)
        .post('/api/usuario/create')
        .set('x-access-token', labfToken)
        .send(user)
        .end((err, res) => {
          // need status 500
          expect(res).to.have.status(500);
          expect(res.body.error).to.have.equal(`Hubo un error en el servidor`);
          done();
        });
    });

    it('it should get an error because request is unauthorized', done => {
      const user = {
        usbId: '00-00001',
        userName: 'Tarmando Prueba',
        userEmail: '00-00001@usb.ve',
        userType: 1111
      };
      chai
        .request(app)
        .post('/api/usuario/create')
        .set('x-access-token', studentToken)
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });
  });

  describe('PUT /api/usuario/update/00-00000', () => {
    it('it should update email of user "00-00000"', done => {
      const user = '00-00000';
      const data = {
        email: '00-00001@usb.ve'
      };
      chai
        .request(app)
        .put(`/api/usuario/update/${user}`)
        .set('x-access-token', labfToken)
        .send(data)
        .end((err, res) => {
          // need status 200
          expect(res).to.have.status(200);
          expect(res.body.message).to.have.equal(
            `Usuario ${user} actualizado correctamente.`
          );
          done();
        });
    });

    it('it should update name and email of user "00-00000"', done => {
      const user = '00-00000';
      const data = {
        email: '00-00002@usb.ve',
        name: 'Mamando Prueba'
      };
      chai
        .request(app)
        .put(`/api/usuario/update/${user}`)
        .set('x-access-token', labfToken)
        .send(data)
        .end((err, res) => {
          // need status 200
          expect(res).to.have.status(200);
          expect(res.body.message).to.have.equal(
            `Usuario ${user} actualizado correctamente.`
          );
          done();
        });
    });

    it('it should update name and email of user "00-00000"', done => {
      const user = '00-00000';
      const data = {
        email: '00-00002@usb.ve',
        name: 'Mamando Prueba'
      };
      chai
        .request(app)
        .put(`/api/usuario/update/${user}`)
        .set('x-access-token', labfToken)
        .send(data)
        .end((err, res) => {
          // need status 200
          expect(res).to.have.status(200);
          expect(res.body.message).to.have.equal(
            `Usuario ${user} actualizado correctamente.`
          );
          done();
        });
    });

    it('it should update active of user "00-00000"', done => {
      const user = '00-00000';
      const data = {
        is_active: 1
      };
      chai
        .request(app)
        .put(`/api/usuario/update/${user}`)
        .set('x-access-token', labfToken)
        .send(data)
        .end((err, res) => {
          // need status 200
          expect(res).to.have.status(200);
          expect(res.body.message).to.have.equal(
            `Usuario ${user} actualizado correctamente.`
          );
          done();
        });
    });

    it('it should fail because no have keys data to update "00-00000"', done => {
      const user = '00-00000';
      const data = {};
      chai
        .request(app)
        .put(`/api/usuario/update/${user}`)
        .set('x-access-token', labfToken)
        .send(data)
        .end((err, res) => {
          // need status 400
          expect(res).to.have.status(400);
          done();
        });
    });

    it('it should get an error because request is unauthorized', done => {
      const user = '00-00000';
      const data = {
        is_active: 0
      };
      chai
        .request(app)
        .put(`/api/usuario/update/${user}`)
        .set('x-access-token', studentToken)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(403);
          done();
        });
    });
  });

  describe('POST /api/usuario/signin', () => {
    it('it should fail because user doesnt exists', done => {
      let user = {
        usbId: '12-1023',
        clave: 'estoesunaclave'
      };
      chai
        .request(app)
        .post('/api/usuario/signin')
        .send(user)
        .end((err, res) => {
          // need status 404
          expect(res).to.have.status(404);
          expect(res.body.error).to.have.equal(
            `Usuario no registrado en la base de datos`
          );
          done();
        });
    });

    it('it should fail because user password is invalid', done => {
      // User in fillerdb
      let user = {
        usbId: '12-10273',
        clave: 'estoesunaclaveerronea'
      };
      chai
        .request(app)
        .post('/api/usuario/signin')
        .send(user)
        .end((err, res) => {
          // need status 404
          expect(res).to.have.status(404);
          expect(res.body.error).to.have.equal(`Clave incorrecta`);
          done();
        });
    });

    it('it should success because user and password are valid', done => {
      // User in fillerdb
      let user = {
        usbId: '12-10273',
        clave: '12345678'
      };
      chai
        .request(app)
        .post('/api/usuario/signin')
        .send(user)
        .end((err, res) => {
          // need status 200
          expect(res).to.have.status(200);
          expect(res.body.auth).to.have.equal(true);
          const verifyToken = jwt.verify(res.body.token, tokenSecret);
          expect(verifyToken).to.be.ok;
          done();
        });
    });
  });

  describe('POST /api/usario/signup', () => {
    it('it should success because user and passwords are valid.', async () => {
      // User in fillerdb
      let user = {
        usbId: '15-10123',
        clave1: '12345678',
        clave2: '12345678'
      };
      const token = await auth.createToken(user.usbId, 'U', '1800s');
      chai
        .request(app)
        .post('/api/usario/signup')
        .set('x-access-token', token)
        .send(user)
        .end((err, res) => {
          // need status 204
          expect(res).to.have.status(204);
        });
    });

    it('it should fail because user and passwords are not valid.', async () => {
      // User in fillerdb
      let user = {
        usbId: '15-10123',
        clave1: '1234568',
        clave2: '12345678'
      };
      const token = await auth.createToken(user.usbId, 'U', '1800s');
      chai
        .request(app)
        .post('/api/usario/signup')
        .set('x-access-token', token)
        .send(user)
        .end((err, res) => {
          // need status 400
          expect(res).to.have.status(400);
          expect(res.body.error).to.have.equal(`Las claves no coinciden`);
        });
    });

    it('it should fail because token is not valid for a valid user.', async () => {
      // User in fillerdb
      let user = {
        usbId: '15-10123',
        clave1: '12345678',
        clave2: '12345678'
      };
      const token = 'tokenerroneo';
      chai
        .request(app)
        .post('/api/usario/signup')
        .set('x-access-token', token)
        .send(user)
        .end((err, res) => {
          // need status 400
          expect(res).to.have.status(400);
          expect(res.body.error).to.have.equal(`Token invalido`);
        });
    });

    it('it should fail because token doesnt belong to the specified user.', async () => {
      // User in fillerdb
      let user = {
        usbId: '15-10123',
        clave1: '12345678',
        clave2: '12345678'
      };
      const token = auth.createToken('cchang', 'U', '1800s');
      chai
        .request(app)
        .post('/api/usario/signup')
        .set('x-access-token', token)
        .send(user)
        .end((err, res) => {
          // need status 400
          expect(res).to.have.status(400);
          expect(res.body.error).to.have.equal(`Token invalido`);
        });
    });

    it('it should fail there is no token.', async () => {
      // User in fillerdb
      let user = {
        usbId: '15-10123',
        clave1: '12345678',
        clave2: '12345678'
      };
      chai
        .request(app)
        .post('/api/usario/signup')
        .send(user)
        .end((err, res) => {
          // need status 400
          expect(res).to.have.status(400);
          expect(res.body.error).to.have.equal(`Falta Token`);
        });
    });
  });

  describe.skip('POST /api/usario/usbInfo', () => {
    function mockCorrectUsbCredentials() {
      fetchMock.mock(
        'http://usbid.dst.usb.ve/cgi/check_user.py',
        {
          has_mail: true,
          sname: 'User Test',
          uid: '11-1234678',
          office: '',
          mobile: '',
          just_deployed: false,
          sid: '11-1234678',
          pid: '21563625',
          telephone: '',
          is_deployed: true,
          deployable: true,
          userType: 'U',
          auto_deployable: false,
          homephone: '',
          gname: 'User Test',
          department: '',
          career: 'Tecnologia Electrica',
          userClass: 'Estudiante de Pregrado',
          has_gmail: true
        },
        {
          method: 'POST',
          headers: {
            origin: 'http://usbid.dst.usb.ve'
          }
        }
      );
    }

    function mockWrongUsbCredentials() {
      fetchMock.mock('http://usbid.dst.usb.ve/cgi/check_user.py', 421, {
        method: 'POST',
        headers: {
          origin: 'http://usbid.dst.usb.ve'
        }
      });
    }

    afterEach(() => {
      fetchMock.restore();
    });

    it('it should success USB credentials', done => {
      mockCorrectUsbCredentials();
      // User in fillerdb
      let user = {
        usbId: '11-1234678',
        clave: 'correctpassw'
      };
      chai
        .request(app)
        .post('/api/usuario/userInfo')
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('it should fail wrong USB credentials', done => {
      mockWrongUsbCredentials();
      // User in fillerdb
      let user = {
        usbId: '15-10123',
        clave: 'incorrectpassword'
      };
      chai
        .request(app)
        .post('/api/usuario/userInfo')
        .send(user)
        .end((err, res) => {
          // need status 400
          expect(res).to.have.status(421);
          expect(res.body.error).to.have.equal(`Error en servidor CAS`);
          done();
        });
    });
  });
});
