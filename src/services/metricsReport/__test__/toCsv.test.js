'use strict'
const { expect } = require('chai')
const { convertGeneralMetrics } = require('../toCsv')
const { historicalMetricsJson } = require('./helpers/models/toCsv')

describe('convert metrics data json into CSV string - Success', () => {
    it('it should convert json into csv file', async () => {
        const actualFormatedCSV = await convertGeneralMetrics(historicalMetricsJson);

        const expected = 'Solicitudes Aprobadas,Solicitudes Rechazadas,Estudiantes atendidos,Materias atendidas,Departamentos Atendidos,Carreras atendidas\n7,3,274,7,3,8\n'

        expect(actualFormatedCSV).to.deep.equal(expected)
    })
})
