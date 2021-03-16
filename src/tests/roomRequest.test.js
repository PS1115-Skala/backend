const chai = require('chai');
const chaiHttp = require('chai-http');


const app = require('../index');
const { setupAdminToken, setupLabfToken } = require('../utils/helpers/setupTokens')

chai.use(chaiHttp);
const expect = chai.expect;

describe('Room Requests', () => {
    
    let adminToken, labfToken;

    before(async () => {
        labfToken = await setupLabfToken();
        adminToken = await setupAdminToken();
    })

    describe('GET /api/labf/solicitudes', () => {
        it('it should get all room Request', (done) => {
            chai.request(app)
                .get('/api/labf/solicitudes')
                .set('x-access-token', labfToken)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(3);
                    done();
                });
        });
    });

    describe('GET /api/sala/solicitudes/crear/ldac', () => {
        it('it should get all room request by ldac', (done) => {
            chai.request(app)
                .get('/api/sala/solicitudes/crear/ldac')
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    const roomRequest = res.body[0]
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(1);
                    expect(roomRequest.id).to.have.equal('2');
                    expect(roomRequest.room_id).to.have.equal('MYS-006');
                    expect(roomRequest.owner_id).to.have.equal('cchang');
                    expect(roomRequest.trimester_id).to.have.equal('ENE-MAR2020');
                    expect(roomRequest.status).to.have.equal('P');
                    done();
                });
        });
    });

    describe('PUT /api/sala/solicitudes/2', () => {
        it('it should update last room:  Sala de pruebas to Saladepruebas', (done) => {
            let roomReqUpdate = {
                status: "R",
            }
            chai.request(app)
                .put('/api/sala/solicitudes/2')
                .set('x-access-token', labfToken)
                .send(roomReqUpdate)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('object');
                    expect(res.body.message).to.have.equal(`Solicitud de agregar sala Atendida`)
                    done();
                });
        });
    });

    describe('POST /api/sala/solicitudes/crear/ldac', () => {
        it('it should create a new room request', (done) => {
            let roomRequest = {
                room_id: 'MYS-123',
            }
            chai.request(app)
                .post('/api/sala/solicitudes/crear/ldac')
                .set('x-access-token', adminToken)
                .send(roomRequest)
                .end((err, res) => {
                    expect(res).to.have.status(201)
                    expect(res.body).be.a('object');
                    expect(res.body.message).to.have.equal( `Solicitud de sala ${roomRequest.room_id} creada exitosamente`)
                    done();
                });
        });
    });


})
