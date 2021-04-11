'use strict'

const path = require('path')

const writeCSV = require('./writeCsv')
const { convertSummaryMetrics } = require('./summaryCsv')
const { labsMetrics } = require('./labsMetrics')
const { subjectsMetrics } = require('./subjectsMetrics')
const { careersMetrics } = require('./careersMetrics')

const filePathMetricsReport = path.join(__dirname, './csvFiles/summaryMetrics')

const getSummaryReport = async (jsonMetrics) => {
    try {
        const formatedCSV = await convertSummaryMetrics(jsonMetrics);
        await writeCSV(filePathMetricsReport)(formatedCSV)
        return true
    } catch (error) {
        return false
    }
}

const getLabsReport = async (jsonMetrics) => {
    try {
        const formatedCSV = await labsMetrics(jsonMetrics);
        await writeCSV(filePathMetricsReport)(formatedCSV)
        return true
    } catch (error) {
        return false
    }
}

const getSubjectsReport = async (jsonMetrics) => {
    try {
        const formatedCSV = await subjectsMetrics(jsonMetrics);
        await writeCSV(filePathMetricsReport)(formatedCSV)
        return true
    } catch (error) {
        return false
    }
}

const getCareersReport = async (jsonMetrics) => {
    try {
        const formatedCSV = await careersMetrics(jsonMetrics);
        await writeCSV(filePathMetricsReport)(formatedCSV)
        return true
    } catch (error) {
        return false
    }
}

module.exports = {
    getSummaryReport,
    getLabsReport,
    getSubjectsReport,
    getCareersReport
}