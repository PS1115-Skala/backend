'use strict'

const csvFormater = require('./util/csvFormater')

const getRequests = ({ request = [0, 0] }) => ({ aprobados: request[0], rechazados: request[1] } || { aprobados: 0, rechazados: 0 })

const getSubjectsQuantity = ({ count = 0 }) => ({ subjectsQuantity: count })

const getDeparmentQuantity = ({ count = 0 }) => ({ deparmentQuantitys: count })

const getCareersQuantity = ({ count = 0 }) => ({ careersQuantitys: count })

const getStudentsLargesQuantity = ({ undergraduateLarge: { totalStudents } }) => ({ largeStudents: totalStudents })

const getStudentsShortsQuantity = ({ undergraduateShort: { totalStudents } }) => ({ shortsStudents: totalStudents })

const getStudentsPostGraduateQuantity = ({ postgraduate: { totalStudents } }) => ({ postgraduateStudents: totalStudents })

const headers = [
  'Solicitudes Aprobadas',
  'Solicitudes Rechazadas',
  'Estudiantes atendidos',
  'Materias atendidas',
  'Departamentos Atendidos',
  'Carreras atendidas',
  'Estudiantes de carreras largas atentidos',
  'Estudiantes de carreras cortas atentidos',
  'Estudiantes de postgrado atentidos'
]

const formatValues = ({ aprobados, rechazados, totalStudents, subjectsQuantity, deparmentQuantitys, careersQuantitys, largeStudents, shortsStudents, postgraduateStudents }) =>
  ([`${aprobados}`, `${rechazados}`, `${totalStudents}`, `${subjectsQuantity}`, `${deparmentQuantitys}`, `${careersQuantitys}`, `${largeStudents}`, `${shortsStudents}`, `${postgraduateStudents}`])

const convertSummaryMetrics = async (jsonMetrics) => {
  const { requestStatus, totalStudents, subjects, department, careers } = jsonMetrics;
  const { aprobados, rechazados } = getRequests(requestStatus)
  const { subjectsQuantity } = getSubjectsQuantity(subjects)
  const { deparmentQuantitys } = getDeparmentQuantity(department)
  const { careersQuantitys } = getCareersQuantity(careers)
  const { largeStudents } = getStudentsLargesQuantity(careers)
  const { shortsStudents } = getStudentsShortsQuantity(careers)
  const { postgraduateStudents } = getStudentsPostGraduateQuantity(careers)

  let csvString = '';
  const values = formatValues({ aprobados, rechazados, totalStudents, subjectsQuantity, deparmentQuantitys, careersQuantitys, largeStudents, shortsStudents, postgraduateStudents })

  csvString = csvFormater(headers) + csvFormater(values)

  return csvString
}

module.exports = { convertSummaryMetrics }