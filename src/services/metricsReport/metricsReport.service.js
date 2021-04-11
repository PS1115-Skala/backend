'use strict'

const path = require('path')

const writeCSV = require('./writeCsv')
const { convertSummaryMetrics } = require('./summaryMetrics')
const { labsMetrics } = require('./labsMetrics')
const { subjectsMetrics } = require('./subjectsMetrics')
const { careersMetrics } = require('./careersMetrics')

const filePathSummaryReport = path.join(__dirname, './csvFiles/summaryMetrics')
const filePathLabsReport = path.join(__dirname, './csvFiles/labsMetrics')
const filePathCareersReport = path.join(__dirname, './csvFiles/careersMetrics')
const filePathSubjectsReport = path.join(__dirname, './csvFiles/subjectsMetrics')

const getSummaryReport = async (jsonMetrics) => {
    try {
        const formatedCSV = await convertSummaryMetrics(jsonMetrics);
        await writeCSV(filePathSummaryReport)(formatedCSV)
        return true
    } catch (error) {
        return false
    }
}

const getLabsReport = async (jsonMetrics) => {
    try {
        const formatedCSV = await labsMetrics(jsonMetrics);
        await writeCSV(filePathLabsReport)(formatedCSV)
        return true
    } catch (error) {
        return false
    }
}

const getSubjectsReport = async (jsonMetrics) => {
    try {
        const formatedCSV = await subjectsMetrics(jsonMetrics);
        await writeCSV(filePathCareersReport)(formatedCSV)
        return true
    } catch (error) {
        return false
    }
}

const getCareersReport = async (jsonMetrics) => {
    try {
        const formatedCSV = await careersMetrics(jsonMetrics);
        await writeCSV(filePathSubjectsReport)(formatedCSV)
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