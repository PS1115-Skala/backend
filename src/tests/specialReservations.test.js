//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let expect = chai.expect;

chai.use(chaiHttp);

const { setupStudentToken, setupAdminToken, setupLabfToken } = require('../utils/helpers/setupTokens')

/*
SPECIAL RESERVATIONS
*/
describe('Special Reservations', () => {

    let labfToken;
    let studentToken;
    let adminToken;

    before(async () => {
        studentToken = await setupStudentToken();
        adminToken = await setupAdminToken();
        labfToken = await setupLabfToken();
    })
    /*
     * Test the /GET about special reservations
     */

    describe('GET /api/special', () => {
        it('it should get an information about all special reservations', (done) => {
            const expected = {
                id: '1',
                requester_id: '13-11341',
                laboratory: 'ldac',
                contact_name: 'David Segura',
                reservation_day: '2020-03-07T00:00:00.000Z',
            }
            chai.request(app)
                .get('/api/special')
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    // need status 200
                    const specialReservation = res.body[0];
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(2);
                    expect(specialReservation).to.deep.equal(expected);
                    done();
                });
        });
    })

    describe('GET /api/special?trim=ENE-MAR2020', () => {
        it('it should get an information about all special reservations in ENE-MAR2020', (done) => {
            const expected = {
                id: "1",
                requester_id: '13-11341',
                laboratory: 'ldac',
                contact_name: 'David Segura',
                reservation_day: '2020-03-07T00:00:00.000Z',
            }
            chai.request(app)
                .get('/api/special?trim=ENE-MAR2020')
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    // need status 200
                    const specialReservation = res.body[0];
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(1);
                    expect(specialReservation).to.deep.equal(expected);
                    done();
                });
        });
    })

    describe('GET /api/special?trim=ENE-MAR2021', () => {
        it('it should get an information about all special reservations in ENE-MAR2021', (done) => {
            chai.request(app)
                .get('/api/special?trim=ENE-MAR2021')
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    // need status 200
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(0);
                    done();
                });
        });
    })

    describe('GET /api/special?lab=ldc', () => {
        it('it should get an information about all special reservations in ENE-MAR2020', (done) => {
            const expected = {
                id: '2',
                requester_id: '12-10273',
                laboratory: 'ldc',
                contact_name: 'Jesus Kauze',
                reservation_day: '2019-02-27T00:00:00.000Z',
            }
            chai.request(app)
                .get('/api/special?lab=ldc')
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    // need status 200
                    const specialReservation = res.body[0];
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(1);
                    expect(specialReservation).to.deep.equal(expected);
                    done();
                });
        });
    })

    describe('GET /api/special?trim=ENE-MAR2019&lab=ldc', () => {
        it('it should get an information about all special reservations in ENE-MAR2019', (done) => {
            const expected = {
                id: '2',
                requester_id: '12-10273',
                laboratory: 'ldc',
                contact_name: 'Jesus Kauze',
                reservation_day: '2019-02-27T00:00:00.000Z',
            }
            chai.request(app)
                .get('/api/special?trim=ENE-MAR2019&lab=ldc')
                .set('x-access-token', labfToken)
                .end((err, res) => {
                    // need status 200
                    const specialReservation = res.body[0];
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(1);
                    expect(specialReservation).to.deep.equal(expected);
                    done();
                });
        });

        it('it should get an error because request is unauthorized', (done) => {
            chai.request(app)
                .get('/api/special?trim=ENE-MAR2019&lab=ldc')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                });
        });
    })

    describe('GET /api/special/1', () => {
        it('it should get an details about a special reservation', (done) => {
            const expected = {
                requester_id: '13-11341',
                laboratory: 'ldac',
                contact_name: 'David Segura',
                contact_email: '13-11341@usb.ve',
                reservation_day: '2020-03-07T00:00:00.000Z',
                reservation_hour: '12:00 PM',
                amount_people: 10,
                observations: 'Necesito computadoras',
                trimester_id: 'ENE-MAR2020'
            }
            chai.request(app)
                .get('/api/special/1')
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    // need status 200
                    const specialReservation = res.body;
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('object');
                    expect(specialReservation).to.deep.equal(expected);
                    done();
                });
        });

        it('it should get an error because request is unauthorized', (done) => {
            chai.request(app)
                .get('/api/special/1')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                });
        });
    })

    /*
     * Test the /POST about special reservations
     */
    describe('POST /api/special/create/15-10123', () => {
        it('it should create a special reservation by a student user', (done) => {
            const user = '15-10123';
            const data = {
                laboratory: 'ldc',
                contact_name: 'Jose Barrera',
                contact_email: '15-10123@usb.ve',
                reservation_day: '2019-09-27',
                reservation_hour: '01:00 PM',
                amount_people: 8,
                observations: 'Necesito video beam y 3 mesas',
                trimester_id: 'SEP-DIC2019'
            }
            chai.request(app)
                .post(`/api/special/create/${user}`)
                .set('x-access-token', studentToken)
                .send(data)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body.message).to.have.equal(`Reservación especial para ${user} creada.`)
                    done();
                });
        });

        it('it should fail when passing inconsistent data', (done) => {
            const user = '15-10123';
            const data = {
                laboratory: 'ldc',
                reservation_hour: '01:00 PM',
                amount_people: 8,
                observations: 'Necesito video beam y 3 mesas',
                trimester_id: 'SEP-DIC2019'
            }
            chai.request(app)
                .post(`/api/special/create/${user}`)
                .set('x-access-token', studentToken)
                .send(data)
                .end((err, res) => {
                    // need status 500
                    expect(res).to.have.status(500);
                    expect(res.body.error).to.have.equal(`Hubo un error en servidor`)
                    done();
                });
        });
    })

    describe('POST /api/special/create/ldac', () => {
        it('it should create a special reservation by a admin user', (done) => {
            const user = 'ldac';
            const data = {
                laboratory: 'ldac',
                contact_name: 'Carolina Chang',
                contact_email: 'cchang@usb.ve',
                reservation_day: '2019-10-19',
                reservation_hour: '01:00 PM',
                amount_people: 1,
                observations: '',
                trimester_id: 'SEP-DIC2019'
            }
            chai.request(app)
                .post(`/api/special/create/${user}`)
                .set('x-access-token', studentToken)
                .send(data)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body.message).to.have.equal(`Reservación especial para ${user} creada.`)
                    done();
                });
        });
    })

    /*
     * Test the /GET about special reservations by user
     */
    describe('GET /api/special/user/<username>', () => {
        it('it should get all special reservation by user 15-10123', (done) => {
            const user = '15-10123';
            chai.request(app)
                .get(`/api/special/user/${user}`)
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(1);
                    done();
                });
        });

        it('it should get any by user labf', (done) => {
            const user = 'labf';
            chai.request(app)
                .get(`/api/special/user/${user}`)
                .set('x-access-token', labfToken)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });

        it('it should get an error because request is unauthorized', (done) => {
            const user = '15-10123';
            chai.request(app)
                .get(`/api/special/user/${user}`)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                });
        });
    })

    /*
     * Test the DELETE about special reservations
     */

    describe('DELETE /api/special/2', () => {
        it('it should delete a special reservation', (done) => {
            chai.request(app)
                .delete('/api/special/2')
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    expect(res).to.have.status(202);
                    done();
                });
        });
    })

    describe('DELETE /api/special/78', () => {
        it('it should fail deleting a special reservation that no exist', (done) => {
            chai.request(app)
                .delete('/api/special/78')
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
        });
    })

    describe('DELETE /api/special/3', () => {
        it('it should get an error because request is unauthorized', (done) => {
            chai.request(app)
                .delete('/api/special/3')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                });
        });
    })
});