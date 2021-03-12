'use strict'

/**
 * 
 * @param {Object} Obj - an Object 
 * @param {Object} Obj.pool - pg client connnection 
 * @param {String} Obj.query - Query postgres 
 * @param {Array<String>} Obj.values? - params values 
 * @returns {Promise<Object>}
 */
const findOne = async ({pool, query, values = []}) => (await pool.query(query, values)).rows[0]

module.exports = { findOne }