const { expect } = require('chai')
const SubjectsService = require('../subjects.service');

describe('Subjects - Success', () => {

    describe('GET all subjects', () => {
        it('it should get all subjects', async () => {
            const subjectsService = new SubjectsService()

            const actual = (await subjectsService.getSubjects()).rows;

            expect(actual).to.be.a('array');
            expect(actual.length).to.be.equal(18);
        })
    })

    describe('GET subjects by a department ', () => {
        it('it should get all subjects associated with a department "CI"', async () => {
            const subjectsService = new SubjectsService()

            const actual = (await subjectsService.getSubjectsByDept('CI')).rows;

            expect(actual).to.be.a('array');
            expect(actual.length).to.be.equal(13);
        })
    })

    describe('GET subjects by a career ', () => {
        it('it should get all subjects associated with a career "0500"', async () => {
            const subjectsService = new SubjectsService()

            const actual = (await subjectsService.getSubjectsByCareer('0500')).rows;

            expect(actual).to.be.a('array');
            expect(actual.length).to.be.equal(4);
        })
    })
})