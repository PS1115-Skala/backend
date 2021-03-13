//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let expect = chai.expect;

chai.use(chaiHttp);

const { setupStudentToken, setupLabfToken } = require('../utils/helpers/setupTokens')

/*
USER
*/
describe('User', () => {

    let labfToken;
    let studentToken;

    before(async () => {
        labfToken = await setupLabfToken();
        studentToken = await setupStudentToken();
    })
    /*
     * Test the /POST about users creation
     */
    describe('POST /api/usuario/create', () => {
        it('it should create a user "00-00000" with a pass defined', (done) => {
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

        it('it should fail when trying to create a user "00-00000" that already exists', (done) => {
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

        it('it should get an error because request is unauthorized', (done) => {
            const user = {
                usbId: "00-00001",
                userName: "Tarmando Prueba",
                userEmail: "00-00001@usb.ve",
                userType: 1111
            }
            chai.request(app)
                .post('/api/usuario/create')
                .set('x-access-token', studentToken)
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                });
        });
    })

    describe('PUT /api/usuario/update/00-00000', () => {
        it('it should update email of user "00-00000"', (done) => {
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

        it('it should update name and email of user "00-00000"', (done) => {
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

        it('it should update name and email of user "00-00000"', (done) => {
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

        it('it should update active of user "00-00000"', (done) => {
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

        it('it should fail because no have keys data to update "00-00000"', (done) => {
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

        it('it should get an error because request is unauthorized', (done) => {
            const user = "00-00000";
            const data = {
                is_active: 0
            }
            chai.request(app)
                .put(`/api/usuario/update/${user}`)
                .set('x-access-token', studentToken)
                .send(data)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                });
        });
    })
});