const validateData = (schema, data) => {
    
    return async (req, res, next) => {
        let schemaValidator;

        typeof schema === 'function' ? schemaValidator = await schema() : schemaValidator = schema

        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true
        };

        const { error, value } = schemaValidator.validate(req[data], options);

        if (error) {
            const { details } = error

            res.status(400).json({ validationError: details.map(x => x.message).join(', ') + ` in req.${data}` });
        } else {
            req[data] = value;
            next();
        }
    }
}

module.exports = { validateData };