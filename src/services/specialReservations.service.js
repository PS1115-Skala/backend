const pool = require('../data_base/pgConnect');
const TrimestersService = require('./trimesters.service');
const trimestersService = new TrimestersService();

class SpecialReservationsService{
    async getAll(labId, trim_id) {
        let query = `SELECT id, requester_id, laboratory, contact_name, reservation_day 
                     FROM special_reservations`;
        let where = ' WHERE ';
        let values = [];
        if (labId != 'all' || trim_id != 'all'){
            if (labId != 'all') {
                where += 'laboratory = $1';
                values.push(labId);
            }
            if (labId != 'all' && trim_id != 'all') {
                where += `and trimester_id= $2`;
                values.push(trim_id)
            }
            else if (trim_id != 'all') {
                where += `trimester_id= $1`;
                values.push(trim_id);
            }
            query += where;
        }
        const specialR = await pool.query(query, values);
        return specialR;
    }

    async getById(id_spec) {
        const query = `SELECT requester_id, laboratory, contact_name, contact_email, reservation_day,
                            reservation_hour, amount_people, observations, trimester_id
                     FROM special_reservations
                     WHERE id = $1`;
        const specialR = await pool.query(query, [id_spec]);
        return specialR;
    }

    async getByUser(user){
        const query = `SELECT id, requester_id, laboratory, contact_name, reservation_day 
        FROM special_reservations WHERE requester_id = $1 ORDER BY reservation_day DESC`;
        const specialR = await pool.query(query, [user]);
        return specialR;
    }

    async create(user,lab,name,email,day,hour,quantity,observations){
        const actualTrimId = await trimestersService.getActualTrim();
        const actualTrim = actualTrimId.rows[0].id;
        const query = `INSERT into special_reservations(requester_id, laboratory, contact_name, contact_email, 
                                 reservation_day, reservation_hour, amount_people, observations, trimester_id) values
                    ($1,$2,$3,$4,$5,$6,$7,$8,$9)`
        const values = [user,lab,name,email,day,hour,quantity,observations,actualTrim];
        await pool.query(query, values);
    }

    async delete(id){
        const query = `DELETE FROM special_reservations WHERE id = $1`;
        await pool.query(query, [id]);
    }
}


module.exports = SpecialReservationsService;