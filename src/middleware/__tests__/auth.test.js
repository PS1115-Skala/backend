const { expect } = require('chai')
const { prototype: { createToken } } = require('../../authentication/auth');

const { isAdminLab, isLabF, isLogged, isBasicLogged, isAdminLogged } = require('../authHandler')
const { USER_TYPE_NUMBERS: { L: lab, LF: labF, U: estudiante } } = require('../../utils/constants')

describe('Authenticacion Middleware - Success', () => {
    it('it Should pass with correct labf Token', async () => {
        const token = await createToken(null, labF, 9999999999)
        const res = { status: () => ({ json: () => null }) }
        const next = () => true
        const req = {
            headers: {
                'x-access-token': token
            }
        }

        const actual = await isLabF(req, res, next)

        expect(actual).to.be.true;
    })

    it('it Should pass with correct lab Token', async () => {
        const token = await createToken(null, lab, 9999999999)
        const res = { status: () => ({ json: () => null }) }
        const next = () => true
        const req = {
            headers: {
                'x-access-token': token
            }
        }

        const actual = await isAdminLab(req, res, next)

        expect(actual).to.be.true;
    })

    it('it Should pass with correct logged user Token', async () => {
        const token = await createToken(null, estudiante, 9999999999)
        const res = { status: () => ({ json: () => null }) }
        const next = () => true
        const req = {
            headers: {
                'x-access-token': token
            }
        }

        const actual = await isLogged(req, res, next)

        expect(actual).to.be.true;
    })

    it('it Should pass with correct Student or Prof or Dept user Token', async () => {
        const token = await createToken(null, estudiante, 9999999999)
        const res = { status: () => ({ json: () => null }) }
        const next = () => true
        const req = {
            headers: {
                'x-access-token': token
            }
        }

        const actual = await isBasicLogged(req, res, next)

        expect(actual).to.be.true;
    })

    it('it Should pass with correct AdminLab or Labf user Token', async () => {
        const token = await createToken(null, lab, 9999999999)
        const res = { status: () => ({ json: () => null }) }
        const next = () => true
        const req = {
            headers: {
                'x-access-token': token
            }
        }

        const actual = await isAdminLogged(req, res, next)

        expect(actual).to.be.true;
    })
})

describe('Authenticacion Middleware - Failure', () => {
    it('it Shouldnt pass with incorrect labf Token', async () => {
        const token = await createToken(null, estudiante, 9999999999)
        const res = { status: () => ({ json: (body) => body }) }
        const next = () => true
        const req = {
            headers: {
                'x-access-token': token
            }
        }

        const actual = await isLabF(req, res, next)

        const expected = { unauthorized: 'User need permissions' }
        expect(actual).to.deep.equal(expected);
    })

    it('it Shouldnt pass with incorrect lab Token', async () => {
        const token = await createToken(null, labF, 9999999999)
        const res = { status: () => ({ json: (body) => body }) }
        const next = () => true
        const req = {
            headers: {
                'x-access-token': token
            }
        }

        const actual = await isAdminLab(req, res, next)

        const expected = { unauthorized: 'User need permissions' }
        expect(actual).to.deep.equal(expected);
    })

    it('it Shouldnt pass with incorrect logged Token', async () => {
        const token = await createToken(null, 'Token invalido', 9999999999)
        const res = { status: () => ({ json: (body) => body }) }
        const next = () => true
        const req = {
            headers: {
                'x-access-token': token
            }
        }

        const actual = await isLogged(req, res, next)

        const expected = { unauthorized: 'Not logged user' }
        expect(actual).to.deep.equal(expected);
    })

    it('it Shouldnt pass without logged Token', async () => {
        const res = { status: () => ({ json: (body) => body }) }
        const next = () => null
        const req = {
            headers: {
                'x-access-token': null
            }
        }

            const actual = await isLogged(req, res, next)
            const expected = { unauthorized: 'Not logged user' }
            expect(actual).to.deep.equal(expected);
    })
})