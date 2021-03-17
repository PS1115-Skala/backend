const { expect } = require('chai')
const DepartmentService = require('../department.service');

describe('Department - Success', () => {

    describe('GET all departments', () => {
        it('it should get all departments', async () => {
            const departmentService = new DepartmentService()

            const actual = (await departmentService.getDepartments()).rows;

            expect(actual).to.be.a('array');
            expect(actual.length).to.be.equal(23);
        })
    })
})