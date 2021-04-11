'use strict'

const childProcess = require('child_process')
const path = require('path')
const { promisify } = require('util')

const MetricsService = require('../services/metrics.service');
const TrimestersService = require('../services/trimesters.service');
const metricsService = new MetricsService();
const trimestersService = new TrimestersService();

const {
    getCareersReport,
    getLabsReport,
    getSummaryReport,
    getSubjectsReport
} = require('../services/metricsReport/metricsReport.service');

const filePath = path.join(__dirname, '../services/metricsReport/csvFiles/')

const asyncExec = promisify(childProcess.exec)

const getFilesToCompress = `careersMetrics.csv labsMetrics.csv subjectsMetrics.csv summaryMetrics.csv`

const getCommand = (files) => `zip -r reporte-labf.zip ${files}`

const compressFiles = async (filePath) => {
    const files = getFilesToCompress
    const command = getCommand(files)

    await asyncExec(command, { cwd: filePath })

    return filePath
}

const getZipPath = (filePath) => `${filePath}reporte-labf.zip`

const downloadFile = (res) => (filePath) => (
    new Promise((resolve, reject) => {
        const zipPath = getZipPath(filePath)
        res.download(zipPath, (err) => {
            return !err ? resolve(filePath) : reject(err)
        })
    })
)

class MetricsController {

    // GET summary metrics reports csv
    async getSummaryMetricsCsv(req, res) {
        const { initTrim, endTrim, labFilter } = req.query
        const { start: initDate } = await trimestersService.getSpecificTrim(initTrim);
        const { finish: endDate } = await trimestersService.getSpecificTrim(endTrim);
        const reservationsRequests = await metricsService.getReservationsRequests({ endDate, initDate, labFilter });
        if (reservationsRequests.length) {
            const formattedMetrics = await metricsService.getFormattedMetrics(reservationsRequests);

            await Promise.all([
                getSummaryReport(formattedMetrics),
                getLabsReport(formattedMetrics),
                getCareersReport(formattedMetrics),
                getSubjectsReport(formattedMetrics),
            ])

            await compressFiles(filePath)
                .then(downloadFile(res))
        }
        return res.status(204).end();
    }
}

module.exports = MetricsController;
