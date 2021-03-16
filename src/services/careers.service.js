const pool = require('../data_base/pgConnect');

class CareerService {
  async getCareers() {
    const query = `SELECT * FROM career`;
    const careers = await pool.query(query);
    return careers;
  }

  async getCareersActive() {
    const query = `SELECT * FROM career WHERE is_active = true`;
    const careers = await pool.query(query);
    return careers;
  }

  async getCareersByType(careerType){
      const query = 'SELECT * FROM career WHERE type = $1';
      const careers = await pool.query(query, [careerType]);
      return careers;
  }
}

module.exports = CareerService;