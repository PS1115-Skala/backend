class MetricExpected {
    expectedHistorical = () => ({
      requestStatus: { status: [ 'Aprobados', 'Rechazados' ], request: [ 7, 3 ] },
      totalStudents: 177,
      laboratories: [
        {
          labId: 'ldac',
          labName: 'Laboratorio Docente de Aulas Computarizadas',
          totalRequest: 9,
          totalApproved: 6,
          totalRejected: 3,
          totalStudents: 157
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
            totalStudents: 32,
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
            totalStudents: 29,
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
            totalStudents: 134,
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
          {
            id: '0600',
            type: 1,
            career: 'Ingeniería Electrónica',
            totalStudents: 48,
            totalRequests: 3,
            totalApproved: 2,
            totalRejected: 1
          },
          {
            id: '0800',
            type: 1,
            career: 'Ingeniería de la Computación',
            totalStudents: 106,
            totalRequests: 6,
            totalApproved: 4,
            totalRejected: 2
          },
          {
            id: '1200',
            type: 1,
            career: 'Ingeniería Geofísica',
            totalStudents: 29,
            totalRequests: 2,
            totalApproved: 1,
            totalRejected: 1
          },
          {
            id: '1700',
            type: 1,
            career: 'Ingeniería de Producción',
            totalStudents: 29,
            totalRequests: 2,
            totalApproved: 1,
            totalRejected: 1
          },
          {
            id: '0500',
            type: 1,
            career: 'Licenciatura en Matemáticas',
            totalStudents: 79,
            totalRequests: 5,
            totalApproved: 3,
            totalRejected: 2
          },
          {
            id: '1800',
            type: 1,
            career: 'Ingeniería de Telecomunicaciones',
            totalStudents: 78,
            totalRequests: 4,
            totalApproved: 3,
            totalRejected: 1
          }
        ]
      }
    });
    expectedLDAC = () => ({
      requestStatus: { status: [ 'Aprobados', 'Rechazados' ], request: [ 6, 3 ] },
      totalStudents: 157,
      laboratories: [
        {
          labId: 'ldac',
          labName: 'Laboratorio Docente de Aulas Computarizadas',
          totalRequest: 9,
          totalApproved: 6,
          totalRejected: 3,
          totalStudents: 157
        }
      ],
      subjects: {
        count: 6,
        rows: [
          {
            id: 'CI2691',
            subjectName: 'Laboratorio de Algoritmos y Estructuras I',
            totalStudents: 32,
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
            totalStudents: 29,
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
            totalStudents: 134,
            totalRequests: 8
          }
        ]
      },
      careers: {
        count: 8,
        undergraduateLarge: {
          count: 8,
          totalStudents: 401,
          totalApproved: 15,
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
          {
            id: '0600',
            type: 1,
            career: 'Ingeniería Electrónica',
            totalStudents: 48,
            totalRequests: 3,
            totalApproved: 2,
            totalRejected: 1
          },
          {
            id: '0800',
            type: 1,
            career: 'Ingeniería de la Computación',
            totalStudents: 86,
            totalRequests: 5,
            totalApproved: 3,
            totalRejected: 2
          },
          {
            id: '1200',
            type: 1,
            career: 'Ingeniería Geofísica',
            totalStudents: 29,
            totalRequests: 2,
            totalApproved: 1,
            totalRejected: 1
          },
          {
            id: '1700',
            type: 1,
            career: 'Ingeniería de Producción',
            totalStudents: 29,
            totalRequests: 2,
            totalApproved: 1,
            totalRejected: 1
          },
          {
            id: '0500',
            type: 1,
            career: 'Licenciatura en Matemáticas',
            totalStudents: 79,
            totalRequests: 5,
            totalApproved: 3,
            totalRejected: 2
          },
          {
            id: '1800',
            type: 1,
            career: 'Ingeniería de Telecomunicaciones',
            totalStudents: 78,
            totalRequests: 4,
            totalApproved: 3,
            totalRejected: 1
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
        undergraduateLarge: {
          count: 7,
          totalStudents: 229,
          totalApproved: 8,
          totalRejected: 0
        },
        undergraduateShort: { count: 0, totalStudents: 0, totalApproved: 0, totalRejected: 0 },
        postgraduate: { count: 0, totalStudents: 0, totalApproved: 0, totalRejected: 0 },
        rows: [
          {
            id: '0100',
            type: 1,
            career: 'Ingeniería Eléctrica',
            totalStudents: 29,
            totalRequests: 1,
            totalApproved: 1,
            totalRejected: 0
          },
          {
            id: '0600',
            type: 1,
            career: 'Ingeniería Electrónica',
            totalStudents: 29,
            totalRequests: 1,
            totalApproved: 1,
            totalRejected: 0
          },
          {
            id: '0800',
            type: 1,
            career: 'Ingeniería de la Computación',
            totalStudents: 52,
            totalRequests: 2,
            totalApproved: 2,
            totalRejected: 0
          },
          {
            id: '1200',
            type: 1,
            career: 'Ingeniería Geofísica',
            totalStudents: 29,
            totalRequests: 1,
            totalApproved: 1,
            totalRejected: 0
          },
          {
            id: '1700',
            type: 1,
            career: 'Ingeniería de Producción',
            totalStudents: 29,
            totalRequests: 1,
            totalApproved: 1,
            totalRejected: 0
          },
          {
            id: '0500',
            type: 1,
            career: 'Licenciatura en Matemáticas',
            totalStudents: 32,
            totalRequests: 1,
            totalApproved: 1,
            totalRejected: 0
          },
          {
            id: '1800',
            type: 1,
            career: 'Ingeniería de Telecomunicaciones',
            totalStudents: 29,
            totalRequests: 1,
            totalApproved: 1,
            totalRejected: 0
          }
        ]
      }
    });
}
module.exports = MetricExpected;