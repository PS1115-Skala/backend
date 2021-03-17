class MetricExpected {
    expectedHistorical = () => ({
        requestStatus: { status: [ 'Aprobados', 'Rechazados' ], request: [ 7, 3 ] },
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
            },
            {
              id: 'PS1115',
              subjectName: 'Sistemas de Información I',
              totalStudents: 20,
              totalRequests: 1
            },
            {
              id: 'CI4835',
              subjectName: 'Redes de Computadoras I',
              totalStudents: 30,
              totalRequests: 1
            },
            {
              id: 'CI2125',
              subjectName: 'Computación I',
              totalStudents: 57,
              totalRequests: 2
            },
            {
              id: 'CI2126',
              subjectName: 'Computación II',
              totalStudents: 19,
              totalRequests: 1
            },
            {
              id: 'CO2111',
              subjectName: 'Cómputo Científico I',
              totalStudents: 23,
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
          undergraduateLargeCount: 8,
          undergraduateShortCount: 0,
          postgraduateCount: 0,
          rows: [
            {
              id: '0100',
              type: 1,
              career: 'Ingeniería Eléctrica',
              totalStudents: 57,
              totalRequests: 2
            },
            {
              id: '0300',
              type: 1,
              career: 'Ingeniería Química',
              totalStudents: 23,
              totalRequests: 1
            },
            {
              id: '0600',
              type: 1,
              career: 'Ingeniería Electrónica',
              totalStudents: 76,
              totalRequests: 3
            },
            {
              id: '0800',
              type: 1,
              career: 'Ingeniería de la Computación',
              totalStudents: 175,
              totalRequests: 6
            },
            {
              id: '1200',
              type: 1,
              career: 'Ingeniería Geofísica',
              totalStudents: 57,
              totalRequests: 2
            },
            {
              id: '1700',
              type: 1,
              career: 'Ingeniería de Producción',
              totalStudents: 57,
              totalRequests: 2
            },
            {
              id: '0500',
              type: 1,
              career: 'Licenciatura en Matemáticas',
              totalStudents: 148,
              totalRequests: 5
            },
            {
              id: '1800',
              type: 1,
              career: 'Ingeniería de Telecomunicaciones',
              totalStudents: 106,
              totalRequests: 4
            }
          ]
        }
    });
    expectedLDAC = () => ({
        requestStatus: { status: [ 'Aprobados', 'Rechazados' ], request: [ 6, 3 ] },
        totalStudents: 254,
        laboratories: [
          {
            labId: 'ldac',
            labName: 'Laboratorio Docente de Aulas Computarizadas',
            totalRequest: 9,
            totalApproved: 6,
            totalRejected: 3,
            totalStudents: 254
          }
        ],
        subjects: {
          count: 6,
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
            },
            {
              id: 'CI4835',
              subjectName: 'Redes de Computadoras I',
              totalStudents: 30,
              totalRequests: 1
            },
            {
              id: 'CI2125',
              subjectName: 'Computación I',
              totalStudents: 57,
              totalRequests: 2
            },
            {
              id: 'CI2126',
              subjectName: 'Computación II',
              totalStudents: 19,
              totalRequests: 1
            },
            {
              id: 'CO2111',
              subjectName: 'Cómputo Científico I',
              totalStudents: 23,
              totalRequests: 1
            }
          ]
        },
        department: {
          count: 2,
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
            }
          ]
        },
        careers: {
          count: 8,
          undergraduateLargeCount: 8,
          undergraduateShortCount: 0,
          postgraduateCount: 0,
          rows: [
            {
              id: '0100',
              type: 1,
              career: 'Ingeniería Eléctrica',
              totalStudents: 57,
              totalRequests: 2
            },
            {
              id: '0300',
              type: 1,
              career: 'Ingeniería Química',
              totalStudents: 23,
              totalRequests: 1
            },
            {
              id: '0600',
              type: 1,
              career: 'Ingeniería Electrónica',
              totalStudents: 76,
              totalRequests: 3
            },
            {
              id: '0800',
              type: 1,
              career: 'Ingeniería de la Computación',
              totalStudents: 155,
              totalRequests: 5
            },
            {
              id: '1200',
              type: 1,
              career: 'Ingeniería Geofísica',
              totalStudents: 57,
              totalRequests: 2
            },
            {
              id: '1700',
              type: 1,
              career: 'Ingeniería de Producción',
              totalStudents: 57,
              totalRequests: 2
            },
            {
              id: '0500',
              type: 1,
              career: 'Licenciatura en Matemáticas',
              totalStudents: 148,
              totalRequests: 5
            },
            {
              id: '1800',
              type: 1,
              career: 'Ingeniería de Telecomunicaciones',
              totalStudents: 106,
              totalRequests: 4
            }
          ]
        }
    });
    expectedActualTrim = () => ({
      requestStatus: { status: [ 'Aprobados', 'Rechazados' ], request: [ 3, 0 ] },
      totalStudents: 81,
      laboratories: [
        {
          labId: 'ldac',
          labName: 'Laboratorio Docente de Aulas Computarizadas',
          totalRequest: 2,
          totalApproved: 2,
          totalRejected: 0,
          totalStudents: 61
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
        count: 3,
        rows: [
          {
            id: 'CI2691',
            subjectName: 'Laboratorio de Algoritmos y Estructuras I',
            totalStudents: 32,
            totalRequests: 1
          },
          {
            id: 'PS1115',
            subjectName: 'Sistemas de Información I',
            totalStudents: 20,
            totalRequests: 1
          },
          {
            id: 'CI2125',
            subjectName: 'Computación I',
            totalStudents: 29,
            totalRequests: 1
          }
        ]
      },
      department: {
        count: 2,
        rows: [
          {
            id: 'CI',
            deptName: 'Departamento de Computación y Tecnología de la Información',
            totalStudents: 61,
            totalRequests: 2
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
        count: 7,
        undergraduateLargeCount: 7,
        undergraduateShortCount: 0,
        postgraduateCount: 0,
        rows: [
          {
            id: '0100',
            type: 1,
            career: 'Ingeniería Eléctrica',
            totalStudents: 29,
            totalRequests: 1
          },
          {
            id: '0600',
            type: 1,
            career: 'Ingeniería Electrónica',
            totalStudents: 29,
            totalRequests: 1
          },
          {
            id: '0800',
            type: 1,
            career: 'Ingeniería de la Computación',
            totalStudents: 52,
            totalRequests: 2
          },
          {
            id: '1200',
            type: 1,
            career: 'Ingeniería Geofísica',
            totalStudents: 29,
            totalRequests: 1
          },
          {
            id: '1700',
            type: 1,
            career: 'Ingeniería de Producción',
            totalStudents: 29,
            totalRequests: 1
          },
          {
            id: '0500',
            type: 1,
            career: 'Licenciatura en Matemáticas',
            totalStudents: 32,
            totalRequests: 1
          },
          {
            id: '1800',
            type: 1,
            career: 'Ingeniería de Telecomunicaciones',
            totalStudents: 29,
            totalRequests: 1
          }
        ]
      }
    });
}
module.exports = MetricExpected;