const { getAdminSalas, getSalas } = require('./rooms.service').prototype;
const { getAdminUsers } = require('./users.service').prototype;
const { getSubjects, getSubjectsByDept } = require('./subjects.service').prototype;
const { getDepartments } = require('./department.service').prototype;
const pool = require('../data_base/pgConnect');

const addDateCondition = ({ query, initDate = null, endDate }) => {
  let filteredQuery = query + ' AND send_time <= $1'
  const values = [endDate]

  if (initDate) { filteredQuery += ' AND send_time >= $2';  values.push(initDate); }

  return { filteredQuery, values }
}

const hasLabFilter = (labFilter) => labFilter ? true : false;

const getRoomsOwnedByLab = async (labFilter) => (await getAdminSalas(labFilter)).rows.map(({ id }) => id);

const filterByLab = async ({ reservationsRequests, labFilter }) => {
  const roomsOwned = await getRoomsOwnedByLab(labFilter);
  const filteredReservationsRequest = reservationsRequests.filter(({ room_id }) => roomsOwned.includes(room_id));
  return filteredReservationsRequest
}

// Formatting Metrics

const filterByStatus = ({ reservationsRequests, statusFilter }) => reservationsRequests.filter(({ status }) => status === statusFilter);

const getRequestStatusMetrics = (reservationsRequests) => ({ 
  status: ['Aprobados', 'Rechazados'],
  request: [filterByStatus({reservationsRequests, statusFilter: 'A'}).length, filterByStatus({reservationsRequests, statusFilter: 'R'}).length] 
});

const getTotalStudentsMetrics = ({reservationsRequests, totalStudents}) => reservationsRequests.forEach(({ quantity }) => totalStudents += quantity);

const getLabsByRoomsReservation = async (reservationsRequests) =>{
  const roomsByReservations = reservationsRequests.map(({room_id}) => room_id);
  const allRooms = (await getSalas()).rows;
  let filteredRooms = allRooms.filter(({ id }) => roomsByReservations.includes(id));
  const labsByRooms = filteredRooms.map(({ manager_id }) => manager_id);
  return labsByRooms;
};

const getLabsReservation = async (reservationsRequests) => {
  const labsByRooms = await getLabsByRoomsReservation(reservationsRequests);
  const allLabs = (await getAdminUsers()).rows;
  const labsFiltered = allLabs.filter(({ id }) => labsByRooms.includes(id));
  return labsFiltered;
};

const getLaboratoriesMetrics = async (reservationsRequests) => {
  let labsByReservation = await getLabsReservation(reservationsRequests);
  labsByReservation.map(({ id, name }) => {
    let reservationByLab = await filterByLab({reservationsRequests, labFilter: id});
    return {
      labId: id, 
      labName: name, 
      totalRequest: reservationByLab.length,
      totalApproved: filterByStatus({ reservationsRequests: reservationByLab, statusFilter: 'A' }).length, 
      totalRejected: filterByStatus({ reservationsRequests: reservationByLab, statusFilter: 'R' }).length,
      totalStudents: getTotalStudentsMetrics({ reservationsRequests: reservationByLab, totalStudents: 0 })()
    }
  });
  return labsByReservation;
};

const filterBySubject = async ({ reservationsRequests, subjectFilter }) => reservationsRequests.filter(({ subject_id }) => subject_id === subjectFilter);

const getSubjectsReservation = async (reservationsRequests) => {
  const subjectsByReservation = reservationsRequests.map(({ subject_id }) => subject_id);
  const allSubjects = (await getSubjects()).rows;
  const subjectsFiltered = allSubjects.filter(({ id }) => subjectsByReservation.includes(id));
  return subjectsFiltered;
};

const getSubjectsMetrics = async (reservationsRequests) => {
  let subjectsByReservation = await getSubjectsReservation(reservationsRequests);
  subjectsByReservation.map(({ id, name }) => {
    let reservationsRequestsBySubject = filterBySubject({ reservationsRequests, subjectFilter: id });
    return { 
      id,
      subjectName: name,
      totalStudents: getTotalStudentsMetrics({ reservationsRequests: reservationsRequestsBySubject, totalStudents: 0}),
      totalRequests: reservationsRequestsBySubject.length
    };
  });
  return { count: subjectsByReservation.length, rows: subjectsByReservation};
};

const filterByDepartment = ({reservationsRequests, subjectsId}) => reservationsRequests.filter(({room_id}) => subjectsId.includes(room_id));

const getDepartmentsMetrics = async (reservationsRequests) => {
  let subjectsByReservation = (await getSubjectsReservation(reservationsRequests)).map(({ dept }) => dept );
  let allDeparments = (await getDepartments()).rows;
  let departmentsByReservation = allDeparments.filter(({ id }) => subjectsByReservation.includes(id));
  departmentsByReservation.map(({ id, name })=>{
    const subjectsByDept = (await getSubjectsByDept).rows;
    let reservationsRequestsByDept = filterByDepartment({reservationsRequests, subjectsId: subjectsByDept});
    return { 
      id, 
      deptName: name,
      totalStudents: getTotalStudentsMetrics({reservationsRequests: reservationsRequestsByDept, totalStudents: 0}),
      totalRequests: reservationsRequestsByDept.length
    }
  });
  return { count: departmentsByReservation.length, rows: departmentsByReservation};
};

class MetricsService {

  /**
   * @param {Object} filters - filters options 
   * @param {Object} filters.endDate? - endDate filter
   * @param {Object} filters.initDate? - initial filter
   * @param {Object} filters.labFilter? - lab filter: ldac || ldac..  
   * @returns {Promise<Array<Object>>} reservations requests metrics
   */
  async getReservationsRequests(filters) {
    const today = new Date()
    const { initDate, endDate = today, labFilter} = filters;

    const query = "SELECT * from reservation_request WHERE status != 'P'"
    
    const { filteredQuery, values } = addDateCondition({ query, initDate, endDate });
    
    let reservationsRequests = (await pool.query(filteredQuery, values)).rows || []

    if (hasLabFilter(labFilter)) reservationsRequests = filterByLab({ reservationsRequests, labFilter });

    return reservationsRequests
  }

  async getFormattedMetrics(reservationsRequests){
    let data = {
      requestStatus: {
        status: [], // Solicitudes: Aprobado y Rechazados
        requests: [] // Totales Aprobados y Totales Rechazados
      },
      totalStudents: 0, // Estudiantes Totales Atendidos
      laboratories: [], // [{labId, labName, totalRequests, totalApproved, totalRejected, totalStudents}]
      subjects: {
        count: 0, // Materias Totales Atendidas
        rows: [] // { id, subjectName, totalStudents, totalRequests }
      },
      department: {
        count: 0, // Departamentos Totales Atendidos
        rows: [] // { id, deptName, totalStudents, totalRequests }
      },
      careers: {
        count: 0, // Carreras Totales Atendidas
        undergraduateLarge: 0, // Carreras Largas Totales Atendidas
        undergraduateShort: 0, // Carreras Cortas Totales Atendidos
        postgraduate: 0, // Carreras Postgrado Totales Atendidos
        rows: [] // { id, career, totalStudents, totalRequests }
      }
    };

    data['requestStatus'] = getRequestStatusMetrics(reservationsRequests); //ready
    data['totalStudents'] = getTotalStudentsMetrics({reservationsRequests, totalStudents: 0})(); //ready
    data['laboratories'] = getLaboratoriesMetrics(reservationsRequests);
    data['subjects'] = getSubjectsMetrics(reservationsRequests);
    data['department'] = getDepartmentsMetrics(reservationsRequests);
    data['careers'] = getCareersMetrics(reservationsRequests);
  }

  async usoDesdeFecha(room_id, fechaInicio) {
    let query = `SELECT sum(quantity) from reservation_request WHERE status='A' and send_time> '${fechaInicio}' and room_id='${room_id}'`;
    const request = await pool.query(query);
    return request.rows[0].sum;
  }
  async numeroDeReservas(modo) {
    let query;
    if (modo == 'T') {
      query = `SELECT count(id) from reservation_request`;
    } else {
      query = `SELECT count(id) from reservation_request WHERE status='${modo}'`;
    }
    const request = await pool.query(query);
    return request.rows[0].count;
  }
  async variacionItems(room_id, trimestreInicio, trimestreFinal) {
    let query = `SELECT id, start from trimester where trimester.id='${trimestreInicio}' or trimester.id='${trimestreFinal}'`;
    let result = await pool.query(query);
    if (result.rowCount <= 1) {
      return 0;
    }
    query = `SELECT trimester_id, room_id, item_id, name, description, quantity from room_item JOIN item on item.id=item_id JOIN trimester on trimester.id=trimester_id 
        WHERE start BETWEEN (SELECT start from trimester WHERE trimester.id='${trimestreInicio}')
        and (SELECT start from trimester WHERE trimester.id='${trimestreFinal}') and room_id='${room_id}' ORDER BY item_id, start`;
    result = await pool.query(query);
    return result || [];
  }
}
module.exports = MetricsService;
