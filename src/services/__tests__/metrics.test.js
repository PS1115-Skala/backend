const { expect } = require('chai')
const MetricService = require('../metrics.service');
const MetricExpected = require('./models_expected/metrics.expected');

describe('General Metrics - Success', () => {

    describe('GET total reservations request', () => {
        it('it should get all historical reservations request from all labs', async () => {
            const filters = {}
            const metricService = new MetricService()

            const actual = await metricService.getReservationsRequests(filters)

            expect(actual).to.be.a('array')
            expect(actual.length).to.be.equal(10)
        })

        it('it should get reservations request from all labs between dates', async () => {
            const filters = { initialDate: '2010-01-01', endDate: '2012-01-01' }
            const metricService = new MetricService()

            const actual = await metricService.getReservationsRequests(filters)

            expect(actual).to.be.a('array')
            expect(actual.length).to.be.equal(0)
        })

        it('it should get reservations request from ldac lab between dates', async () => {
            const filters = { labFilter: 'ldac', initialDate: '2010-01-01', endDate: '2022-01-01' }
            const metricService = new MetricService()

            const actual = await metricService.getReservationsRequests(filters)

            expect(actual).to.be.a('array')
            expect(actual.length).to.be.equal(9)
        })

        it('it should not get reservations request from ldc lab', async () => {
            const filters = { labFilter: 'ldc' }
            const metricService = new MetricService()

            const actual = await metricService.getReservationsRequests(filters)

            expect(actual).to.be.a('array')
            expect(actual.length).to.be.equal(1)
        })
    })

    describe('GET formatted reservations request', () => {
        it('it should get all formatted reservations request from all labs', async () => {
            const filters = {};
            const metricService = new MetricService();
            const metricExpected = new MetricExpected();

            const reservationsRequests = await metricService.getReservationsRequests(filters);
            const actual = await metricService.getFormattedMetrics(reservationsRequests);

            expect(actual).to.be.a('object')
            expect(actual).to.deep.equal(metricExpected.expected1())
        })

        it('it should get all formatted reservations request from ldac lab between dates', async () => {
            const filters = { labFilter: 'ldac', initialDate: '2010-01-01', endDate: '2022-01-01' }
            const metricService = new MetricService();
            const metricExpected = new MetricExpected();

            const reservationsRequests = await metricService.getReservationsRequests(filters);
            const actual = await metricService.getFormattedMetrics(reservationsRequests);

            expect(actual).to.be.a('object')
            expect(actual).to.deep.equal(metricExpected.expected2())
        })
    })
})


