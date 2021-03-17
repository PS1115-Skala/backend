//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../index');
let expect = chai.expect;

chai.use(chaiHttp);

const { setupStudentToken, setupLabfToken } = require('../utils/helpers/setupTokens')
const MetricExpected = require('../services/__tests__/models_expected/metrics.expected');

/*
METRICS
*/
describe('Metrics', () => {

    let labfToken;
    let studentToken;

    before(async () => {
        studentToken = await setupStudentToken();
        labfToken = await setupLabfToken();
    })
    /*
     * Test the /GET about special reservations
     */

    describe('GET /metrics/reservas', () => {
        it('it should get all metrics of reservations request from all labs', (done) => {
            const metricExpected = new MetricExpected();
            chai.request(app)
                .get('/api/metrics/reservas')
                .set('x-access-token', labfToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).be.a('object');
                    expect(res.body).to.deep.equal(metricExpected.expectedActualTrim());
                    done();
                });
        });

        it('it should get an error because request is unauthorized', (done) => {
            chai.request(app)
                .get('/api/metrics/reservas')
                .set('x-access-token', studentToken)
                .end((err, res) => {
                    expect(res).to.have.status(403);
                    done();
                });
        });
    })

    describe('GET /metrics/reservas?labFilter=bwl', () => {
        it('it should get not content by reservation request for bwl lab', (done) => {
            chai.request(app)
                .get('/api/metrics/reservas?labFilter=bwl')
                .set('x-access-token', labfToken)
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    })

    describe('GET /metrics/reservas?initTrim=ENE-MAR2018', () => {
        it('it should get all metrics historic of reservations request from all labs', (done) => {
            const metricExpected = new MetricExpected();
            chai.request(app)
                .get('/api/metrics/reservas?initTrim=ENE-MAR2018')
                .set('x-access-token', labfToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.deep.equal(metricExpected.expectedHistorical());
                    done();
                });
        });
    })
});