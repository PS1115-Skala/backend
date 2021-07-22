const { expect } = require('chai')
const CareerService = require('../careers.service');

describe('Careers - Success', () => {

    describe('GET all careers', () => {
        it('it should get all careers', async () => {
            const careerService = new CareerService()

            const actual = (await careerService.getCareers()).rows;

            expect(actual).to.be.a('array');
            expect(actual.length).to.be.equal(19);
        })
    })

    describe('GET active careers', () => {
        it('it should get all active careers', async () => {
            const careerService = new CareerService()

            const actual = (await careerService.getCareersActive()).rows;

            expect(actual).to.be.a('array');
            expect(actual.length).to.be.equal(19);
        })
    })

    describe('GET careers by type', () => {
        it('it should get all undergraduate large careers', async () => {
            const careerService = new CareerService()

            const actual = (await careerService.getCareersByType(1)).rows;

            expect(actual).to.be.a('array');
            expect(actual.length).to.be.equal(19);
        })
    })
})