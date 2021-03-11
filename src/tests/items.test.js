let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let expect = chai.expect;

const { setupAdminToken, setupStudentToken } = require('../utils/helpers/setupTokens')

chai.use(chaiHttp);


describe('Subjects', () => {

    let studentToken

    before(async () => {
        studentToken = await setupStudentToken();
    })

    describe('GET /api/subjects', () => {
        it('it should get 21 subjects', (done) => {
            chai.request(app)
                .get('/api/subjects')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(21);
                    done();
                });
        });
    });
});

describe('Items', () => {

    let adminToken, studentToken;

    before(async () => {
        studentToken = await setupStudentToken();
        adminToken = await setupAdminToken();
    })

    describe('GET /api/items', () => {
        it('it should get 11 items', (done) => {
            chai.request(app)
                .get('/api/items')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(11);
                    done();
                });
        });
    });

    describe('GET /api/items/1', () => {
        it('it should get specific item: Mouse', (done) => {
            chai.request(app)
                .get('/api/items/1')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    const element = res.body[0]
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('array');
                    expect(res.body.length).be.eql(1);
                    expect(element.id).to.have.equal("1");
                    expect(element.name).to.have.equal('Mouse');
                    expect(element.description).to.have.equal(null);
                    done();
                });
        });
    });

    describe('POST /api/item', () => {
        it('it should create new item ItemPrueba', (done) => {
            let item = {
                name: "ItemPrueba",
                description: "descriptionPrueba"
            }
            chai.request(app)
                .post('/api/item')
                .set('x-access-token', adminToken)
                .send(item)
                .end((err, res) => {
                    expect(res).to.have.status(201)
                    expect(res.body).be.a('object');
                    expect(res.body.message).to.have.equal('Item ' + item.name + ' creado')
                    done();
                });
        });
    });

    describe('PUT /api/items/12', () => {
        it('it should update last item: ItemPrueba to ItemPrueba2', (done) => {
            let id = 12
            let itemUpdate = {
                name: "ItemPrueba2",
                description: "descriptionPrueba2"
            }
            chai.request(app)
                .put('/api/items/' + id)
                .set('x-access-token', adminToken)
                .send(itemUpdate)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('object');
                    expect(res.body.message).to.have.equal(`Item ${id} actualizado`)
                    done();
                });
        });
    });

    describe('DELETE /api/items/12', () => {
        it('it should delete last item created: ItemPrueba ', (done) => {
            let id = 12
            chai.request(app)
                .delete('/api/items/' + id)
                .set('x-access-token', adminToken)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).be.a('object');
                    expect(res.body.message).to.have.equal('Item Id: ' + id + ' Eliminado correctamente')
                    done();
                });
        });
    });
});
