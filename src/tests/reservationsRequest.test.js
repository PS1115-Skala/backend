const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

const { setupAdminToken, setupStudentToken } = require('../utils/helpers/setupTokens')

chai.use(chaiHttp);

describe('Reservations requests', () => {

    let adminToken, studentToken;

    before(async () => {
        studentToken = await setupStudentToken();
        adminToken = await setupAdminToken();
    })
    /*
     * Test the /GET info about reservation request
     */
    describe('GET /api/solicitudes/1', () => {
        it('it should get an information about one reservation request', (done) => {
            chai.request(app)
                .get('/api/solicitudes/1')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    const reservationRequest = res.body[0]
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(1);
                    expect(reservationRequest.id).to.have.equal('1');
                    expect(reservationRequest.room_id).to.have.equal('MYS-019');
                    expect(reservationRequest.requester_id).to.have.equal('15-10611');
                    expect(reservationRequest.trimester_id).to.have.equal('ENE-MAR2020');
                    done();
                });
        });
    });

    describe('GET /api/solicitudes/1/horario', () => {
        it('it should get the schedule of reservation request 1', (done) => {
            chai.request(app)
                .get('/api/solicitudes/1/horario')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    const schedule = res.body.schedule;
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('object');
                    expect(schedule.length).be.eql(12);
                    expect(res.body.typeWeek).to.have.equal('pares');
                    expect(schedule[0].day).to.have.equal('Lunes');
                    expect(schedule[0].hour).to.have.equal(1);
                    expect(schedule[0].week).to.have.equal(2);
                    done();
                });
        });
    });

    describe('GET /api/solicitudes/16/horario', () => {
        it('it should get the schedule of reservation request 16', (done) => {
            chai.request(app)
                .get('/api/solicitudes/16/horario')
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    const schedule = res.body.schedule;
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('object');
                    expect(schedule.length).be.eql(6);
                    expect(res.body.typeWeek).to.have.equal('impares');
                    expect(schedule[0].day).to.have.equal('Jueves');
                    expect(schedule[0].hour).to.have.equal(11);
                    expect(schedule[0].week).to.have.equal(1);
                    done();
                });
        });
    });

    describe('GET /api/solicitudes/17/horario', () => {
        it('it should get empty schedule of reservation request 17', (done) => {
            chai.request(app)
                .get('/api/solicitudes/17/horario')
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });

    describe('GET /solicitudes/usuario/12-10273', () => {
        it('it should get the 4 reservations request in ENE-MAR2020',(done) => {
            chai.request(app)
                .get('/api/solicitudes/usuario/12-10273')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(4);
                    done();
                });
        });
    });

    describe('GET /solicitudes/admin/ldac', () => {
        it('it should get all reservations request to ldac in ENE-MAR2020',(done) => {
            chai.request(app)
                .get('/api/solicitudes/admin/ldac')
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(45);
                    done();
                });
        });
    });

    /*
     * Test the /POST
     */
    describe('POST /api/crear/solicitudes/reserva', () => {
        it('it should create new reservation request', (done) => {
            let request = [{
                "requester": "ldac",
                "subject": "PS1115",
                "room": "MYS-019",
                "quantity": 30,
                "material": "Debian 10 y GCC",
                "semanas": "impares"
            },{
                "dia": "miercoles",
                "hora": 1
            }]
            chai.request(app)
                .post('/api/crear/solicitudes/reserva')
                .set('x-access-token', studentToken)
                .send(request)
                .end((err, res) => {
                    expect(res).to.have.status(201)
                    expect(res.body).be.a('object');
                    expect(res.body.message).to.have.equal( `Se creo correctamente la solicitud`)
                    done();
                });
        });
    });

    /*
     * Test the /PUT
     */
    describe('PUT /api/solicitudes/reserva/16', () => {
        it('it should aproved the last request', (done) => {
            let aprovedReq = {
                status: "A"
            }
            chai.request(app)
                .put('/api/solicitudes/reserva/16')
                .set('x-access-token', studentToken)
                .send(aprovedReq)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('object');
                    done();
                });
        });
    });

    /*
     * Test the /DELETE
     */
    describe('DELETE /api/eliminar/solicitud/reserva/15', () => {
        it('it should delete the pending request (15)', (done) => {
            chai.request(app)
                .delete('/api/eliminar/solicitud/reserva/15')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    // status: 200
                    expect(res).to.have.status(200)
                    // type: array
                    expect(res.body).be.a('object');
                    // message: Solicitud eliminada satisfactoriamente
                    expect(res.body.message).to.have.equal( `Solicitud eliminada satisfactoriamente`)
                    done();
                });
        });
    });

});
