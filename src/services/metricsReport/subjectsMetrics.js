'use strict'

const csvFormater = require('./util/csvFormater')

const headers = [
  'ID materia',
  'Nombre materia',
  'Estudiantes atendidos',
  'Solicitudes realizadas',
]

const existsData = (subjectsData) => subjectsData.length

const formatSubjectStats = ({ id, subjectName, totalStudents, totalRequests }) => (
  [`${id}`, `${subjectName}`, `${totalStudents}`, `${totalRequests}`]
)

const getFormatedSubjectsStats = (subjects) => subjects.map(formatSubjectStats)

const subjectsMetrics = async (jsonMetrics) => {
  const { subjects: { rows } } = jsonMetrics;
  const subjectsData = rows

  let csvString = csvFormater(headers);

  if (!existsData(subjectsData)) { return csvString }

  const formatedSubjects = getFormatedSubjectsStats(subjectsData);
  formatedSubjects.map(subjectStats => {
    csvString += csvFormater(subjectStats)
  });

  return csvString
}

module.exports = { subjectsMetrics }