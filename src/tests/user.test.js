//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let expect = chai.expect;

chai.use(chaiHttp);

const { setupLabfToken } = require('../utils/helpers/setupTokens')

/*
USER
*/
describe('User', () => {

    let labfToken;

    before(async () => {
        labfToken = await setupLabfToken();
    })
    /*
     * Test the /POST about users creation
     */
    describe('POST /api/usuario/create', () => {
        it('it should create a user with a pass defined', (done) => {
            const user = {
                usbId: "00-00000",
                userName: "Armando Prueba",
                userEmail: "00-00000@usb.ve",
                userType: 1111
            }
            chai.request(app)
                .post('/api/usuario/create')
                .set('x-access-token', labfToken)
                .send(user)
                .end((err, res) => {
                    // need status 200
                    expect(res).to.have.status(201);
                    expect(res.body.message).to.have.equal(`Usuario ${user.usbId} creado.`)
                    done();
                });
        });
    })


    describe('POST /api/usuario/create', () => {
        it('it should fail when trying to create a user that already exists', (done) => {
            const user = {
                usbId: "00-00000",
                userName: "Armando Prueba",
                userEmail: "00-00000@usb.ve",
                userType: 1111
            }
            chai.request(app)
                .post('/api/usuario/create')
                .set('x-access-token', labfToken)
                .send(user)
                .end((err, res) => {
                    // need status 400
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.have.equal(`Usuario ya se encuentra activo`)
                    done();
                });
        });
    })

    describe('POST /api/usuario/create', () => {
        it('it should fail when passing inconsistent data', (done) => {
            const user = {
                usbId: "11223"
            }
            chai.request(app)
                .post('/api/usuario/create')
                .set('x-access-token', labfToken)
                .send(user)
                .end((err, res) => {
                    // need status 500
                    expect(res).to.have.status(500);
                    expect(res.body.error).to.have.equal(`Hubo un error en el servidor`)
                    done();
                });
        });
    })

    describe('PUT /api/usuario/update/:userId', () => {
        it('it should update email of user Armando', (done) => {
            const user = "00-00000";
            const data = {
                email: "00-00001@usb.ve"
            }
            chai.request(app)
                .put(`/api/usuario/update/${user}`)
                .set('x-access-token', labfToken)
                .send(data)
                .end((err, res) => {
                    // need status 200
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.have.equal(`Usuario ${user} actualizado correctamente.`)
                    done();
                });
        });
    })

    describe('PUT /api/usuario/update/:userId', () => {
        it('it should update name and email of user Armando ', (done) => {
            const user = "00-00000";
            const data = {
                email: "00-00002@usb.ve",
                name: "Mamando Prueba"
            }
            chai.request(app)
                .put(`/api/usuario/update/${user}`)
                .set('x-access-token', labfToken)
                .send(data)
                .end((err, res) => {
                    // need status 200
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.have.equal(`Usuario ${user} actualizado correctamente.`)
                    done();
                });
        });
    })

    describe('PUT /api/usuario/update/:userId', () => {
        it('it should update active of user Armando ', (done) => {
            const user = "00-00000";
            const data = {
                is_active: 1
            }
            chai.request(app)
                .put(`/api/usuario/update/${user}`)
                .set('x-access-token', labfToken)
                .send(data)
                .end((err, res) => {
                    // need status 200
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.have.equal(`Usuario ${user} actualizado correctamente.`)
                    done();
                });
        });
    })

    describe('PUT /api/usuario/update', () => {
        it('it should fail because no have keys', (done) => {
            const user = "00-00000";
            const data = {
            }
            chai.request(app)
                .put(`/api/usuario/update/${user}`)
                .set('x-access-token', labfToken)
                .send(data)
                .end((err, res) => {
                    // need status 400
                    expect(res).to.have.status(400);
                    done();
                });
        });
    })
});