'use strict'
const { expect } = require('chai')

const { convertSummaryMetrics } = require('../summaryCsv')
const { labsMetrics } = require('../labsMetrics')
const { historicalMetricsJson } = require('./helpers/models/toCsv')

describe('convert summary metrics data json into CSV string - Success', () => {
    it('it should convert json into csv file', async () => {
        const actualFormatedCSV = await convertSummaryMetrics(historicalMetricsJson);

        const expected = 'Solicitudes Aprobadas,Solicitudes Rechazadas,Estudiantes atendidos,Materias atendidas,Departamentos Atendidos,Carreras atendidas\n7,3,274,7,3,8\n'

        expect(actualFormatedCSV).to.deep.equal(expected)
    })
})

describe('convert labs metrics data json into CSV string - Success', () => {
    it('it should convert json into csv file', async () => {
        const actualFormatedCSV = await labsMetrics(historicalMetricsJson);

        const expected = 'ID laboratorio,Nombre laboratorio,Solicitudes atendidas,Solicitudes aprobadas,Solicitudes rechazadas,Estudiantes atendidos\nldac,Laboratorio Docente de Aulas Computarizadas,9,6,3,254\nldc,Laboratorio Docente de Computación,1,1,0,20\n'

        expect(actualFormatedCSV).to.deep.equal(expected)
    })
})