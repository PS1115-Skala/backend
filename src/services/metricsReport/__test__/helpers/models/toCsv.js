'use strict'

const historicalMetricsJson = {
    requestStatus: { status: ['Aprobados', 'Rechazados'], request: [7, 3] },
    totalStudents: 274,
    laboratories: [
        {
            labId: 'ldac',
            labName: 'Laboratorio Docente de Aulas Computarizadas',
            totalRequest: 9,
            totalApproved: 6,
            totalRejected: 3,
            totalStudents: 254
        },
        {
            labId: 'ldc',
            labName: 'Laboratorio Docente de Computación',
            totalRequest: 1,
            totalApproved: 1,
            totalRejected: 0,
            totalStudents: 20
        }
    ],
    subjects: {
        count: 7,
        rows: [
            {
                id: 'CI2691',
                subjectName: 'Laboratorio de Algoritmos y Estructuras I',
                totalStudents: 101,
                totalRequests: 3
            },
            {
                id: 'CI2692',
                subjectName: 'Laboratorio de Algoritmos y Estructuras II',
                totalStudents: 24,
                totalRequests: 1
            }
        ]
    },
    department: {
        count: 3,
        rows: [
            {
                id: 'CO',
                deptName: 'Departamento de Cómputo Científico y Estadística',
                totalStudents: 23,
                totalRequests: 1
            },
            {
                id: 'CI',
                deptName: 'Departamento de Computación y Tecnología de la Información',
                totalStudents: 231,
                totalRequests: 8
            },
            {
                id: 'PS',
                deptName: 'Departamento de Procesos y Sistemas',
                totalStudents: 20,
                totalRequests: 1
            }
        ]
    },
    careers: {
        count: 8,
        undergraduateLarge: {
            count: 8,
            totalStudents: 421,
            totalApproved: 16,
            totalRejected: 9
        },
        undergraduateShort: { count: 0, totalStudents: 0, totalApproved: 0, totalRejected: 0 },
        postgraduate: { count: 0, totalStudents: 0, totalApproved: 0, totalRejected: 0 },
        rows: [
            {
                id: '0100',
                type: 1,
                career: 'Ingeniería Eléctrica',
                totalStudents: 29,
                totalRequests: 2,
                totalApproved: 1,
                totalRejected: 1
            },
            {
                id: '0300',
                type: 1,
                career: 'Ingeniería Química',
                totalStudents: 23,
                totalRequests: 1,
                totalApproved: 1,
                totalRejected: 0
            },
        ]
    }
}

module.exports = { historicalMetricsJson };