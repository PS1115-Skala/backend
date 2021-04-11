'use strict'

const csvFormater = require('./util/csvFormater')

const headers = [
  'ID laboratorio',
  'Nombre laboratorio',
  'Solicitudes atendidas',
  'Solicitudes aprobadas',
  'Solicitudes rechazadas',
  'Estudiantes atendidos'
]

const existsData = (labsData) => labsData.length

const formatLabStats = ({ labId, labName, totalRequest, totalApproved, totalRejected, totalStudents }) => (
  [`${labId}`, `${labName}`, `${totalRequest}`, `${totalApproved}`, `${totalRejected}`, `${totalStudents}`]
)

const getFormatedLabsStats = (labs) => labs.map(formatLabStats)

const labsMetrics = async (jsonMetrics) => {
  const { laboratories } = jsonMetrics;

  let csvString = csvFormater(headers);

  if (!existsData(laboratories)) { return csvString }

  const formatedLabs = getFormatedLabsStats(laboratories);
  formatedLabs.map(labStats => {
    csvString += csvFormater(labStats)
  });

  return csvString
}

module.exports = { labsMetrics }