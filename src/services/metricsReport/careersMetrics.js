'use strict'

const csvFormater = require('./util/csvFormater')

const headers = [
  'ID carrera',
  'Tipo ',
  'Nombre carrera',
  'Estudiantes atendidos',
  'Solicitudes realizadas',
  'Solicitudes aprobadas',
  'Solicitudes rechazadas',
]

const existsData = (careersData) => careersData.length

const formatcareerStats = ({ id, type, career, totalStudents, totalRequests, totalApproved, totalRejected }) => (
  [`${id}`, `${type}`, `${career}`, `${totalStudents}`, `${totalRequests}`, `${totalApproved}`, `${totalRejected}`]
)

const getFormatedCareersStats = (careers) => careers.map(formatcareerStats)

const careersMetrics = async (jsonMetrics) => {
  const { careers: { rows } } = jsonMetrics;
  const careersData = rows

  let csvString = csvFormater(headers);

  if (!existsData(careersData)) { return csvString }

  const formatedCareers = getFormatedCareersStats(careersData);
  formatedCareers.map(subjectStats => {
    csvString += csvFormater(subjectStats)
  });

  return csvString
}

module.exports = { careersMetrics }