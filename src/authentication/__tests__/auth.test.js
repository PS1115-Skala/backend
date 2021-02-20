const { expect } = require('chai');
const { prototype: { encryptPassword } } = require('../auth.js');

// mas info de expect https://www.chaijs.com/api/bdd/

describe('Authentication service - Success', () => {
	it('it Should encrypt string password', async () => {
		// Preparacion
		const passwordToEncrypt = 'BarreraFlojo';

		// Ejecucion
		const actual = await encryptPassword(passwordToEncrypt);

		// Comparacion y expected
		expect(actual).to.not.equal(passwordToEncrypt);
		expect(actual).to.have.lengthOf(60);
	});

	it('it Should compare passwords', async () => {
		// prueba tus funciones aqui
	});

	it('it Should create token', async () => {
		// prueba tus funciones aqui
	});

	it('it Should verify token', async () => {
		// prueba tus funciones aqui
	});
});

describe('Authentication service - Failure', () => {
	it('it Should throw a error when empty Password is passed', async () => {
		// Preparacion
		const emptyPassword = null;
		const expected = new Error('El pepe error');

		try {
			// Ejecucion
			await encryptPassword(emptyPassword);
			expect.fail('not throwing a error');
		} catch (err) {
			// Comparacion y expected
			expect(err).to.deep.equal(expected);
		}

	});

	it('it Should compare passwords incorrectly', async () => {
		// prueba tus funciones aqui
	});

	it('it Should thrown an error when create token dont have id or type', async () => {
		// prueba tus funciones aqui
	});

	it('it Should verify token incorrectly', async () => {
		// prueba tus funciones aqui
	});
});

