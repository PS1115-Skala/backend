const { expect } = require('chai')
const { getExistentTrim } = require('../trimesters.service').prototype;

describe('GET all historical trimesters', () => {
    it('it should get all trimesters', async () => {
        const actual = (await getExistentTrim());

        expect(actual).to.be.a('array');
        expect(actual.length).to.be.equal(6);
    })
})