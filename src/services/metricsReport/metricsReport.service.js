'use strict'

const path = require('path')
const writeCSV = require('./writeCsv')
const { convertGeneralMetrics } = require('./toCsv')

const filePathMetricsReport = path.join(__dirname, './csvFiles/summaryMetrics')

const getSummaryReport = async (jsonMetrics) => {
    try {
        const formatedCSV = await convertGeneralMetrics(jsonMetrics);
        await writeCSV(filePathMetricsReport)(formatedCSV)
        return true
    } catch (error) {
        return false
    }
}

module.exports = { getSummaryReport }