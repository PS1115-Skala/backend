const pool = require('../data_base/pgConnect');

class SubjectsService {
  async getSubjects() {
    const query = `SELECT * FROM subject`;
    const subjects = await pool.query(query);
    return subjects;
  }

  async getSubjectsByDept(deptId){
    const query = 'SELECT id FROM subject WHERE dept = $1'
    const subjects = await pool.query(query, [deptId]);
    return subjects;
  }

  async getSubjectsCareer(){
    const query = 'SELECT * FROM career_subject';
    const subjectsCareer = await pool.query(query);
    return subjectsCareer;
  }

  async getSubjectsByCareer(careerId){
    const query = 'SELECT subject FROM career_subject WHERE career = $1';
    const subjects = await pool.query(query, [careerId]);
    return subjects;
  }
}

module.exports = SubjectsService;
