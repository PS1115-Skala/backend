const { prototype: { loginUser } } = require('../../services/users.service')

/**
 * @returns {Promise<string>} StudentToken 
 */
const setupStudentToken = async () => (loginUser('12-10273', '12345678'))

/**
 * @returns {Promise<string>} AdminToken 
 */
const setupAdminToken = async () => (loginUser('ldac', '12345678'))

/**
 * @returns {Promise<string>} LabFToken 
 */
const setupLabfToken = () => (loginUser('labf', '12345678'))

module.exports = {
    setupStudentToken,
    setupAdminToken,
    setupLabfToken
}