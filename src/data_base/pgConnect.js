const { Pool } = require('pg');
const { host, user, password, database, portdb } = require('../config');

//  ************************ ACCESO A BD POSTGRESQL  ***********************
// Obtiene todos estos valores del ./config/index.js
// PD: para el refactor del codigo seria bueno que anada condicionales aqui para correr con BD de QA y BD de PROD, para los tests de QA con jenkins
const pool = new Pool({
  host: host,
  user: user,
  password: password,
  database: database,
  port: portdb
});

module.exports = pool;
