//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
var expect = chai.expect;

chai.use(chaiHttp);

/*
USER
*/
describe('User', () => {
    /*
     * Test the /POST about users creation
     */
    describe('POST /api/usuario/create', () => {
        it('it should create a user with a pass defined', (done) => {
            let user = {
                usbId: "00-00000",
                userName: "Armando Prueba",
                userEmail: "00-00000@usb.ve",
                userType: 1111
            }
            chai.request(app)
                .post('/api/usuario/create')
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
            let user = {
                usbId: "00-00000",
                userName: "Armando Prueba",
                userEmail: "00-00000@usb.ve",
                userType: 1111
            }
            chai.request(app)
                .post('/api/usuario/create')
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
            let user = {
                usbId: "11223"
            }
            chai.request(app)
                .post('/api/usuario/create')
                .send(user)
                .end((err, res) => {
                    // need status 500
                    expect(res).to.have.status(500);
                    expect(res.body.error).to.have.equal(`Hubo un error en el servidor`)
                    done();
                });
        });
    })

    describe('PUT /api/usuario/update', () => {
        it('it should update email of user Armando', (done) => {
            let user = {
                id: "00-00000",
                email: "00-00001@usb.ve"
            }
            chai.request(app)
                .put('/api/usuario/update')
                .send(user)
                .end((err, res) => {
                    // need status 200
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.have.equal(`Usuario ${user.id} actualizado correctamente.`)
                    done();
                });
        });
    })

    describe('PUT /api/usuario/update', () => {
        it('it should update name and email of user Armando ', (done) => {
            let user = {
                id: "00-00000",
                email: "00-00002@usb.ve",
                name: "Marmando Prueba"
            }
            chai.request(app)
                .put('/api/usuario/update')
                .send(user)
                .end((err, res) => {
                    // need status 200
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.have.equal(`Usuario ${user.id} actualizado correctamente.`)
                    done();
                });
        });
    })

    describe('PUT /api/usuario/update', () => {
        it('it should update active of user Armando ', (done) => {
            let user = {
                id: "00-00000",
                is_active: 1
            }
            chai.request(app)
                .put('/api/usuario/update')
                .send(user)
                .end((err, res) => {
                    // need status 200
                    expect(res).to.have.status(200);
                    expect(res.body.message).to.have.equal(`Usuario ${user.id} actualizado correctamente.`)
                    done();
                });
        });
    })

    describe('PUT /api/usuario/update', () => {
        it('it should fail because no have keys', (done) => {
            let user = {
                id: "00-00000"
            }
            chai.request(app)
                .put('/api/usuario/update')
                .send(user)
                .end((err, res) => {
                    // need status 400
                    expect(res).to.have.status(400);
                    done();
                });
        });
    })
});