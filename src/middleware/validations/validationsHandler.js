const Joi = require('joi');

const validateData = (schema, data) => {
    return (req, res, next) => {
        
        const { error } = Joi.validate(req[data], schema);
        const valid = error == null;

        if (valid) next();
        const { details } = error;
        const message = details.map(i => i.message).join(',');

        console.log("error", message);
        res.status(422).json({ error: message })
    }
}

module.exports = { validateData };