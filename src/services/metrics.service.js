const { getAdminSalas } = require('./rooms.service').prototype
const pool = require('../data_base/pgConnect');

const addDateCondition = ({ queryString, initDate = null, endDate }) => {
  let filteredQuery = queryString + ' AND send_time <= $1'
  const values = [endDate]

  if (initDate) filteredQuery = ' AND send_time >= $2' && values.push(initDate);

  return { filteredQuery, values }
}

const hasLabFilter = (labFilter) => labFilter ? true : false;

const getRoomsOwnedByLab = async (labFilter) => (await getAdminSalas(labFilter)).rows.map(({ id }) => id);

const filterByLab = async ({ reservationsRequests, labFilter }) => {
  const roomsOwned = await getRoomsOwnedByLab(labFilter);
  const filteredReservationsRequest = reservationsRequests.filter(({ room_id }) => roomsOwned.includes(room_id));
  return filteredReservationsRequest
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
    const { initDate = null, endDate = today, labFilter = null } = filters;

    const query = "SELECT * from reservation_request WHERE status != 'E'"

    const { filteredQuery, values } = addDateCondition({ query, initDate, endDate });

    let reservationsRequests = (await pool.query(filteredQuery, values)).rows

    if (hasLabFilter(labFilter)) reservationsRequests = filterByLab({ reservationsRequests, labFilter });

    return reservationsRequests
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
