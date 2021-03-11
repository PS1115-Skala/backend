const pool = require('../data_base/pgConnect');
const TrimestersService = require('./trimesters.service');
const trimestersService = new TrimestersService();

class SpecialReservationsService{
    async getSpecialReservations() {
        let query = `SELECT id, requester_id, contact_name, contact_email, reservation_day,
                            reservation_hour, amount_people, observations, trimester_id
                     FROM special_reservations`;
        const specialR = await pool.query(query);
        return specialR;
    }

    async getActualSpecialReservations() {
        let actualTrimId = await trimestersService.getActualTrim();
        const value = actualTrimId.rows[0].id;
        let query = `SELECT id, requester_id, contact_name, contact_email, reservation_day,
                            reservation_hour, amount_people, observations
                     FROM special_reservations
                     WHERE trimester_id= $1`;
        const specialR = await pool.query(query, value);
        return specialR;
    }

    async getTrimSpecialReservations(trim_id) {
        let query = `SELECT id, requester_id, contact_name, contact_email, reservation_day,
                            reservation_hour, amount_people, observations
                     FROM special_reservations
                     WHERE trimester_id= $1`;
        const specialR = await pool.query(query, trim_id);
        return specialR;
    }

    async createSpecialReservation(user,name,email,day,hour,quantity,observations){
        let actualTrimId = await trimestersService.getActualTrim();
        const value = actualTrimId.rows[0].id;
        let query = `INSERT into special_reservations(requester_id, contact_name, contact_email, reservation_day, reservation_hour, amount_people, observations, trimester_id) values
                    (${user},${name},${email},${day},${hour},${quantity},${observations},${value})`;
        await pool.query(query);
    }

    async deleteSpecialReservation(id){
        let query = `DELETE FROM special_reservations WHERE id = ${id}`;
        await pool.query(query);
    }
}


module.exports = SpecialReservationsService;