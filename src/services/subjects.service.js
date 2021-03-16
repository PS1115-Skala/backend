const pool = require('../data_base/pgConnect');

class SubjectsService {
  async getSubjects() {
    let query = `SELECT * FROM subject`;
    const subjects = await pool.query(query);
    return subjects;
  }

  async getSubjectsByDept(deptId){
    let query = 'SELECT id FROM subject WHERE dept = $1'
    const subjects = await pool.query(query, [deptId]);
    return subjects;
  }
}

module.exports = SubjectsService;
