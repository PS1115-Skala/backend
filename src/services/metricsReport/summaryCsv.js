'use strict'

const csvFormater = require('./util/csvFormater')

const getRequests = ({ request = [0,0] }) => ({ aprobados: request[0], rechazados: request[1] } || { aprobados: 0, rechazados: 0 })

const getSubjectsQuantity = ({ count = 0 }) => ({ subjectsQuantity: count })

const getDeparmentQuantity = ({ count = 0 }) => ({ deparmentQuantitys: count })

const getCareersQuantity = ({ count = 0 }) => ({ careersQuantitys: count })

const headers = [
  'Solicitudes Aprobadas',
  'Solicitudes Rechazadas',
  'Estudiantes atendidos',
  'Materias atendidas',
  'Departamentos Atendidos',
  'Carreras atendidas'
]

const formatValues = ({ aprobados, rechazados, totalStudents, subjectsQuantity, deparmentQuantitys, careersQuantitys }) =>
  ([`${aprobados}`, `${rechazados}`, `${totalStudents}`, `${subjectsQuantity}`, `${deparmentQuantitys}`, `${careersQuantitys}`])

const convertSummaryMetrics = async (jsonMetrics) => {
  const { requestStatus, totalStudents, subjects, department, careers } = jsonMetrics;
  const { aprobados, rechazados } = getRequests(requestStatus)
  const { subjectsQuantity } = getSubjectsQuantity(subjects)
  const { deparmentQuantitys } = getDeparmentQuantity(department)
  const { careersQuantitys } = getCareersQuantity(careers)

  let csvString = '';
  const values = formatValues({ aprobados, rechazados, totalStudents, subjectsQuantity, deparmentQuantitys, careersQuantitys })

  csvString = csvFormater(headers) + csvFormater(values)

  return csvString
}

module.exports = { convertSummaryMetrics }