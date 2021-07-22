const AuthService = require('../authentication/auth');
const { USER_TYPE_NUMBERS: { L: lab, LF: labF, U: estudiante, O: dept, P: prof } } = require('../utils/constants')

const authService = new AuthService()

const isValidType = (type) =>
    (type === labF || type === lab || type === estudiante || type === prof || type === dept)

const isValidBasicType = (type) =>
    (type === estudiante || type === prof || type === dept)

const isValidAdminType = (type) =>
    (type === labF || type === lab)

const isAdminLab = async (req, res, next) => {
    const { type } = await authService.verifyAuthToken(req)
    if (type === lab) return next()
    else return res.status(403).json({ unauthorized: 'User need permissions' })
}

const isLabF = async (req, res, next) => {
    const { type } = await authService.verifyAuthToken(req)
    if (type === labF) return next()
    else return res.status(403).json({ unauthorized: 'User need permissions' })
}

const isLogged = async (req, res, next) => {
    const { type } = await authService.verifyAuthToken(req)
    if (isValidType(type)) return next()
    else return res.status(403).json({ unauthorized: 'Not logged user' })
}

const isBasicLogged = async (req, res, next) => {
    const { type } = await authService.verifyAuthToken(req)
    if (isValidBasicType(type)) return next()
    else if (type === labF) return next()
    else return res.status(403).json({ unauthorized: 'User need permissions' })
}

const isAdminLogged = async (req, res, next) => {
    const { type } = await authService.verifyAuthToken(req)
    if (isValidAdminType(type)) return next()
    else return res.status(403).json({ unauthorized: 'User need permissions' })
}

module.exports = {
    isAdminLab,
    isLabF,
    isLogged,
    isBasicLogged,
    isAdminLogged,
};