const pool = require('../data_base/pgConnect');
const TrimestersService = require('./trimesters.service');
const trimestersService = new TrimestersService();

const getWeekType = (reservationRequest) => {
  let weeks = [];
  reservationRequest.forEach((reservation) => {
    weeks.includes(reservation.week) ? {} : weeks.push(reservation.week);
  })
  if (weeks.length == 1) return { typeWeek: weeks[0].toString() };
  else if (weeks.length == 6) return (weeks[0] % 2) == 0 ? { typeWeek: "pares" } : { typeWeek: "impares" };
  else if (weeks.length == 12) return { typeWeek: "todas" };
  else return { typeWeek: "-1" };
}

class ReservationRequestService {
  async getRequest(solicitudId) {
    const query = `SELECT * FROM reservation_request WHERE id = $1`;
    const request = await pool.query(query, [solicitudId]);
    return request;
  }

  async getScheduleFromRequestForPut(solicitudId) {
    const query = `SELECT * FROM reservation_request_schedule AS horario JOIN reservation_request AS solicitud ON
                     horario.reservation_request_id = solicitud.id WHERE reservation_request_id = $1`;
    const request = await pool.query(query, [solicitudId]);
    return request;
  }

  async getScheduleFromRequest(solicitudId) {
    const query = `SELECT * FROM reservation_request_schedule AS horario JOIN reservation_request AS solicitud ON
                     horario.reservation_request_id = solicitud.id WHERE reservation_request_id = $1`;
    const request = await pool.query(query, [solicitudId]);
    const content = request.rows;
    const { typeWeek } = getWeekType(content);
    const response = {
      typeWeek: typeWeek,
      schedule: content
    };
    return response;
  }

  //tomo el horario de la solicitud, tomo la sala a la cual va la solicitud, busco todos los horarios de esa sala
  async checkIfExists(roomId, solicitudId) {
    const query = `SELECT * FROM reservation_request_schedule AS r JOIN (SELECT * FROM asignation JOIN
            asig_schedule ON asignation.id = asig_schedule.asignation_id WHERE room_id = $1)
            AS result ON result.day = r.day AND result.hour = r.hour WHERE r.reservation_request_id = $2`;
    const values = [roomId, solicitudId];
    const request = await pool.query(query, values);
    return request;
  }

  async getRequestUser(userId) {
    const trimestre = await trimestersService.getActualTrim();
    const values = [userId, trimestre.rows[0].id];
    let query = `SELECT * FROM reservation_request WHERE requester_id = $1 AND trimester_id = $2`;
    const requestsUsers = await pool.query(query, values);
    return requestsUsers;
  }

  async getAllPendingRequestOfLastTrim(trimester_id) {
    const query = `SELECT id FROM reservation_request WHERE status = 'P' AND trimester_id = $1`;
    const requests = await pool.query(query, [trimester_id]);
    return requests;
  }

  async getRequests(labId) {
    const query = `SELECT result.id, name, requester_id, room_id, subject_id, send_time, reason, material_needed, type, status, quantity
        FROM (SELECT reservation_request.id, requester_id, room_id, subject_id, send_time, trimester_id, reason,
        material_needed, quantity, status FROM reservation_request JOIN room ON reservation_request.room_id = room.id
        JOIN usuario ON usuario.id = room.manager_id WHERE manager_id = $1) AS result JOIN usuario ON usuario.id = result.requester_id
        WHERE status = 'P'`;
    const requests = await pool.query(query, [labId]);
    return requests;
  }

  async updateRequest(id, reason, status) {
    const query = `UPDATE reservation_request SET reason = $1, status = $2 WHERE id = $3`;
    const values = [reason, status, id];
    const request_updated = await pool.query(query, values);
    return request_updated;
  }

  // Crea la reserva y su horario a partir de la solicitud y el horario de solicitud
  async createReservation(room, subject_id, trimester_id, date, requestId) {
    const query = `INSERT INTO asignation (room_id, subject_id, trimester_id, date) VALUES ($1, $2, $3, $4) RETURNING id`;
    const values = [room, subject_id, trimester_id, date];
    const createAsignation = await pool.query(query, values);
    const id = createAsignation.rows[0].id;
    const request_schedule = await this.getScheduleFromRequestForPut(requestId);
    for (let index = 0; index < request_schedule.rowCount; index++) {
      const element = request_schedule.rows[index];
      let values = [id, element.week, element.day, element.hour];
      let query1 = `INSERT INTO asig_schedule (asignation_id, week, day, hour) VALUES ($1,$2,$3,$4)`;
      await pool.query(query1, values);
    }
    return createAsignation;
  }

  async createReservationRequest(requester, subject, room, material, quantity) {
    const temp = await trimestersService.getActualTrim();
    const trimestreActual = temp.rows[0].id;
    const values = [
      requester,
      room,
      subject,
      trimestreActual,
      material,
      quantity
    ];
    const query = `INSERT into reservation_request(requester_id, room_id, subject_id, trimester_id, reason, material_needed, quantity, status) VALUES
                    ($1, $2, $3, $4, 'En espera', $5, $6, 'P') RETURNING id`;
    const createdRequest = await pool.query(query, values);
    const id = createdRequest.rows[0].id;
    return createdRequest, id;
  }

  async createReservationAsAdmin(requester, subject, room, material, quantity) {
    const temp = await trimestersService.getActualTrim();
    const trimestreActual = temp.rows[0].id;
    const values = [
      requester,
      room,
      subject,
      trimestreActual,
      material,
      quantity
    ];
    const query = `INSERT into reservation_request(requester_id, room_id, subject_id, trimester_id, reason, material_needed, quantity, status) VALUES
                    ($1, $2, $3, $4, 'Solicitud Aceptada', $5, $6, 'A') RETURNING id`;
    const createdRequest = await pool.query(query, values);
    const id = createdRequest.rows[0].id;
    return createdRequest, id;
  }

  // Funcion para insertar horario en una semana especifica (utilizar con loop todas, pares, impares, especifica)
  async insertarhorario(semana, horarios, id) {
    // Horario es el req.body completo, los horarios empiezan en el req.body[1]
    for (let index = 1; index < horarios.length; index++) {
      const horario = horarios[index];
      const { dia, hora } = horario;
      await this.createReservationRequestSchedule(dia, hora, semana, id);
    }
  }

  async createReservationRequestSchedule(day, hour, week, reservationId) {
    const query = `INSERT into reservation_request_schedule(reservation_request_id, day, hour, week) VALUES
                    ($1, $2, $3, $4)`;
    const values = [reservationId, day, hour, week];
    const createdSchedule = await pool.query(query, values);
    return createdSchedule;
  }

  async deleteRequest(id) {
    // Elimina primero el horario asignado a esa solicitud y luego la solicitud de reserva como tal
    const queryDeleteSchedule = `DELETE FROM reservation_request_schedule WHERE reservation_request_id = $1`;
    const queryDeleteRequest = `DELETE FROM reservation_request WHERE id = $1`;
    await pool.query(queryDeleteSchedule, [id]);
    const deletedRequest = await pool.query(queryDeleteRequest, [id]);
    return deletedRequest;
  }
}

module.exports = ReservationRequestService;
