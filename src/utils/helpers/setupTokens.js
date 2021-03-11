const { prototype: { loginUser } } = require('../../services/users.service')

/**
 * @returns {Promise<string>} labfToken 
 */
const setupStudentToken = async () => (loginUser('12-10273', '12345678'))

/**
 * @returns {Promise<string>} labfToken 
 */
const setupAdminToken = async () => (loginUser('ldac', '12345678'))

/**
 * @returns {Promise<string>} labfToken 
 */
const setupLabfToken = () => (loginUser('labf', '12345678'))

module.exports = {
    setupStudentToken,
    setupAdminToken,
    setupLabfToken
}