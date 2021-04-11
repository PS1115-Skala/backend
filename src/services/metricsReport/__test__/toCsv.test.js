'use strict'
const { expect } = require('chai')

const { historicalMetricsJson } = require('./helpers/models/toCsv')

const { convertSummaryMetrics } = require('../summaryMetrics')
const { labsMetrics } = require('../labsMetrics')
const { subjectsMetrics } = require('../subjectsMetrics')
const { careersMetrics } = require('../careersMetrics')

describe('convert summary metrics data json into CSV string - Success', () => {
    it('it should convert json into csv file', async () => {
        const actualFormatedCSV = await convertSummaryMetrics(historicalMetricsJson);

        const expected = 'Solicitudes Aprobadas,Solicitudes Rechazadas,Estudiantes atendidos,Materias atendidas,Departamentos Atendidos,Carreras atendidas,Estudiantes de carreras largas atentidos,Estudiantes de carreras cortas atentidos,Estudiantes de postgrado atentidos\n7,3,274,7,3,8,421,0,0\n'

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

describe('convert subjects metrics data json into CSV string - Success', () => {
    it('it should convert json into csv file', async () => {
        const actualFormatedCSV = await subjectsMetrics(historicalMetricsJson);

        const expected = 'ID materia,Nombre materia,Estudiantes atendidos,Solicitudes realizadas\nCI2691,Laboratorio de Algoritmos y Estructuras I,101,3\nCI2692,Laboratorio de Algoritmos y Estructuras II,24,1\n'

        expect(actualFormatedCSV).to.deep.equal(expected)
    })
})

describe('convert careers metrics data json into CSV string - Success', () => {
    it('it should convert json into csv file', async () => {
        const actualFormatedCSV = await careersMetrics(historicalMetricsJson);

        const expected = 'ID carrera,Tipo ,Nombre carrera,Estudiantes atendidos,Solicitudes realizadas,Solicitudes aprobadas,Solicitudes rechazadas\n0100,1,Ingeniería Eléctrica,29,2,1,1\n0300,1,Ingeniería Química,23,1,1,0\n'

        expect(actualFormatedCSV).to.deep.equal(expected)
    })
})