'use strict'
const { expect } = require('chai')
const fs = require('fs')
const path = require('path')
const removeCsv = require('../deleteCsv')
const writeCsv = require('../writeCsv')

const filePathMetricsReportTest = path.join(__dirname, '../csvFiles/summaryMetricsTest')

describe('handler csv file operations - Success', () => {
    it('it should create csv file', async () => {
        const csvString = 'Solicitudes Aprobadas,Solicitudes Rechazadas,Estudiantes atendidos,Materias atendidas,Departamentos Atendidos,Carreras atendidas\n7,3,274,7,3,8\n'

        await writeCsv(filePathMetricsReportTest)(csvString)

        fs.access(`${filePathMetricsReportTest}.csv`, fs.F_OK, (err) => {
            if (err) {
                expect.fail('csv file path does not exists')
            }
        })
    })

    it('it should delete csv file', async () => {
        try {
            await removeCsv(`${filePathMetricsReportTest}.csv`)
        } catch (error) {
            expect.fail('', '',`no se pudo eliminar el archivo: ${error}`)
        }
    })
    
})
