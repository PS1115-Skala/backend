const Joi = require('joi');
const { getActualTrim } = require('../../../services/trimesters.service').prototype

const actualTrim = async () => (await getActualTrim()).rows[0].id

// Schemas con defaults de promesas
const metricsSchema = async () => Joi.object().keys({
    initTrim: Joi.string().default(await actualTrim()),
    endTrim: Joi.string().default(await actualTrim()),
    labFilter: Joi.string().default(null),
});

// EXAMPLE Schemas con defaults sin promesas
// const metricsSchema = Joi.object().keys({
//     initTrim: Joi.string().default('example'),
//     endTrim: Joi.string().default('example'),
//     labFilter: Joi.date().default(null),
// });

module.exports = { metricsSchema }