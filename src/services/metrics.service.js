const { getAdminSalas, getSalas } = require('./rooms.service').prototype;
const { getAdminUsers } = require('./users.service').prototype;
const { getSubjects, getSubjectsByDept, getSubjectsByCareer, getSubjectsCareer} = require('./subjects.service').prototype;
const { getDepartments } = require('./department.service').prototype;
const { getCareersActive } = require('./careers.service').prototype;
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

const getTotalStudentsMetrics = (reservationsRequests) => {
  let totalStudents = 0;
  reservationsRequests = filterByStatus({ reservationsRequests, statusFilter: 'A' });
  reservationsRequests.forEach(({ quantity }) => totalStudents += quantity);
  return totalStudents;
}

const getLabsByRoomsReservation = async (reservationsRequests) =>{
  reservationsRequests = filterByStatus({ reservationsRequests, statusFilter: 'A' });
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

const laboratoriesMapPromise = async ({ labsByReservation, reservationsRequests} ) => {
  labsByReservation = labsByReservation.map(async ({ id, name }) => {
    let reservationByLab = await filterByLab({reservationsRequests, labFilter: id});
    return {
      labId: id, 
      labName: name, 
      totalRequest: reservationByLab.length,
      totalApproved: filterByStatus({ reservationsRequests: reservationByLab, statusFilter: 'A' }).length, 
      totalRejected: filterByStatus({ reservationsRequests: reservationByLab, statusFilter: 'R' }).length,
      totalStudents: getTotalStudentsMetrics(reservationByLab)
    }
  });
  return Promise.all(labsByReservation);
}

const getLaboratoriesMetrics = async (reservationsRequests) => {
  let labsByReservation = await getLabsReservation(reservationsRequests);
  labsByReservation = await laboratoriesMapPromise({ labsByReservation, reservationsRequests});
  return labsByReservation;
};

const filterBySubject = ({ reservationsRequests, subjectFilter }) => reservationsRequests.filter(({ subject_id }) => subject_id === subjectFilter);

const getSubjectsReservation = async (reservationsRequests) => {
  reservationsRequests = filterByStatus({ reservationsRequests, statusFilter: 'A' });
  const subjectsByReservation = reservationsRequests.map(({ subject_id }) => subject_id);
  const allSubjects = (await getSubjects()).rows;
  const subjectsFiltered = allSubjects.filter(({ id }) => subjectsByReservation.includes(id));
  return subjectsFiltered;
};

const getSubjectsMetrics = async (reservationsRequests) => {
  let subjectsByReservation = await getSubjectsReservation(reservationsRequests);
  subjectsByReservation = subjectsByReservation.map(({ id, name }) => {
    let reservationsRequestsBySubject = filterBySubject({ reservationsRequests, subjectFilter: id });
    return { 
      id,
      subjectName: name,
      totalStudents: getTotalStudentsMetrics(reservationsRequestsBySubject),
      totalRequests: reservationsRequestsBySubject.length
    };
  });
  return { count: subjectsByReservation.length, rows: subjectsByReservation};
};

const filterReservationsBySubjects = ({reservationsRequests, subjectsId}) => reservationsRequests.filter(({ subject_id }) => subjectsId.includes(subject_id));

const departmentsMapPromise = async ({ departmentsByReservation, reservationsRequests} ) => {
  departmentsByReservation = departmentsByReservation.map(async ({ id, name }) =>{
    const subjectsByDept = (await getSubjectsByDept(id)).rows.map(({ id }) => id);
    let reservationsRequestsByDept = filterReservationsBySubjects({reservationsRequests, subjectsId: subjectsByDept});
    return { 
      id, 
      deptName: name,
      totalStudents: getTotalStudentsMetrics(reservationsRequestsByDept),
      totalRequests: reservationsRequestsByDept.length
    }
  });
  return Promise.all(departmentsByReservation);
}

const getDepartmentsMetrics = async (reservationsRequests) => {
  let subjectsByReservation = (await getSubjectsReservation(reservationsRequests)).map(({ dept }) => dept );
  let allDepartments = (await getDepartments()).rows;
  let departmentsByReservation = allDepartments.filter(({ id }) => subjectsByReservation.includes(id));
  departmentsByReservation = await departmentsMapPromise({ departmentsByReservation, reservationsRequests });
  return { count: departmentsByReservation.length, rows: departmentsByReservation};
};

const getCareersByReservations = async (reservationsRequests) => {
  const subjectsByReservations = (await getSubjectsReservation(reservationsRequests)).map(({ id }) => id);
  let subjectsCareer = (await getSubjectsCareer()).rows.filter(({ subject }) => subjectsByReservations.includes(subject));
  subjectsCareer = subjectsCareer.map(({ career }) => career);
  const allCareers = (await getCareersActive()).rows;
  let careersFiltered = allCareers.filter(({ id }) => subjectsCareer.includes(id));
  return careersFiltered;
};

const filterByCareerType = ({ careers, filterType }) => careers.filter(({ type }) => type === filterType);

const careerMapPromise = async ({ careersByReservation, reservationsRequests} ) => {
  careersByReservation = careersByReservation.map(async ({ id, name, type }) => {
    const subjectsByCareer = (await getSubjectsByCareer(id)).rows.map(({ subject }) => subject);
    let reservationsByCareer = filterReservationsBySubjects({reservationsRequests, subjectsId: subjectsByCareer});
    return {
      id, 
      type,
      career: name, 
      totalStudents: getTotalStudentsMetrics(reservationsByCareer),
      totalRequests: reservationsByCareer.length,
      totalApproved: filterByStatus({ reservationsRequests: reservationsByCareer, statusFilter: 'A' }).length,
      totalRejected: filterByStatus({ reservationsRequests: reservationsByCareer, statusFilter: 'R' }).length
    };
  });
  return Promise.all(careersByReservation);
}

const getStudentsCareer = ({ careers, filterType }) => filterByCareerType({careers, filterType}).map(({totalStudents}) => totalStudents).reduce((a,b) => a+b,0);
const getApprovedCareer = ({ careers, filterType }) => filterByCareerType({careers, filterType}).map(({totalApproved}) => totalApproved).reduce((a,b) => a+b,0);
const getRejectedCareer = ({ careers, filterType }) => filterByCareerType({careers, filterType}).map(({totalRejected}) => totalRejected).reduce((a,b) => a+b,0);

const getCareersMetrics = async (reservationsRequests) => {
  let careersByReservation = await getCareersByReservations(reservationsRequests);
  const undergraduateLargeCount = filterByCareerType({ careers: careersByReservation, filterType: 1}).length;
  const undergraduateShortCount = filterByCareerType({ careers: careersByReservation, filterType: 0}).length;
  const postgraduateCount = filterByCareerType({ careers: careersByReservation, filterType: 2}).length;
  careersByReservation = await careerMapPromise({ careersByReservation, reservationsRequests });
  return { 
    count: careersByReservation.length, 
    undergraduateLarge: { 
      count: undergraduateLargeCount, 
      totalStudents: getStudentsCareer({careers: careersByReservation, filterType: 1}),
      totalApproved: getApprovedCareer({careers: careersByReservation, filterType: 1}),
      totalRejected: getRejectedCareer({careers: careersByReservation, filterType: 1})
    },
    undergraduateShort: { 
      count: undergraduateShortCount, 
      totalStudents: getStudentsCareer({careers: careersByReservation, filterType: 0}),
      totalApproved: getApprovedCareer({careers: careersByReservation, filterType: 0}),
      totalRejected: getRejectedCareer({careers: careersByReservation, filterType: 0})
    }, 
    postgraduate: { 
      count: postgraduateCount, 
      totalStudents: getStudentsCareer({careers: careersByReservation, filterType: 2}),
      totalApproved: getApprovedCareer({careers: careersByReservation, filterType: 2}),
      totalRejected: getRejectedCareer({careers: careersByReservation, filterType: 2})
    },
    rows: careersByReservation
  };
}

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
  };

  async getFormattedMetrics(reservationsRequests){
    const formattedData = {};

    formattedData['requestStatus'] = await getRequestStatusMetrics(reservationsRequests);
    formattedData['totalStudents'] = getTotalStudentsMetrics(reservationsRequests);
    formattedData['laboratories'] = await getLaboratoriesMetrics(reservationsRequests);
    formattedData['subjects'] = await getSubjectsMetrics(reservationsRequests);
    formattedData['department'] = await getDepartmentsMetrics(reservationsRequests);
    formattedData['careers'] = await getCareersMetrics(reservationsRequests);

    return formattedData;
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
