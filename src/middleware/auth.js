module.exports = (req, res, next) => {
    console.log('validations ok');
    req.user_type = 'tipoUsuario';
    next()
};