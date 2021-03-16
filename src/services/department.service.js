const pool = require('../data_base/pgConnect');

class DepartmentService {
  async getDepartments() {
    const query = `SELECT * FROM dept`;
    const departments = await pool.query(query);
    return departments;
  }
}

module.exports = DepartmentService;