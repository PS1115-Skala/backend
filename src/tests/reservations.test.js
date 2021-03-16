const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../index');
const { setupAdminToken, setupStudentToken } = require('../utils/helpers/setupTokens')

chai.use(chaiHttp);
const expect = chai.expect;

describe('Reservations', () => {

    let adminToken, studentToken;

    before(async () => {
        studentToken = await setupStudentToken();
        adminToken = await setupAdminToken();
    })

    describe('GET /api/reservas/MYS-019/semana/pares', () => {
        it('it should get 4 reservations in MYS-019 by Type week: pares', (done) => {
            chai.request(app)
                .get('/api/reservas/MYS-019/semana/pares')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.above(1);
                    done();
                });
        });
    });

    describe('GET /api/reservas/MYS-019/semana/todas', () => {
        it('it should get 4 reservations in MYS-019 by Type week: todas', (done) => {
            chai.request(app)
                .get('/api/reservas/MYS-019/semana/todas')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.above(1);
                    done();
                });
        });
    });

    describe('GET /api/reservas/MYS-019/semana/impares', () => {
        it('it should get 0 reservations in MYS-019 by Type week: impares', (done) => {
            chai.request(app)
                .get('/api/reservas/MYS-019/semana/impares')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.equal(0);
                    done();
                });
        });
    });

    describe('GET /api/reservas/MYS-019', () => {
        it('it should get 2 reservations in MYS-019', (done) => {
            chai.request(app)
                .get('/api/reservas/MYS-019')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.equal(2);
                    done();
                });
        });
    });

    describe('GET /api/reservas/1/horario', () => {
        it('it should get the 12 schedule of reservation with id 1', (done) => {
            chai.request(app)
                .get('/api/reservas/1/horario')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(12);
                    done();
                });
        });
    });

    describe('POST /api/crear/reserva', () => {
        it('it should create a new reservation', (done) => {
            let reservation = [{
                "requester": "ldac",
                "subject": "PS1111",
                "room":"MYS-019",
                "quantity": 10,
                "material": "NADA",
                "semanas": "impares"
            },
            {
                "dia": "jueves",
                "hora": 3
            }]
            chai.request(app)
                .post('/api/crear/reserva')
                .set('x-access-token', adminToken)
                .send(reservation)
                .end((err, res) => {
                    expect(res).to.have.status(201)
                    expect(res.body).be.a('object');
                    expect(res.body.message).to.have.equal( `Se creo exitosamente la reserva para la materia PS1111 en la sala MYS-019`)
                    done();
                });
        });
    });
});
