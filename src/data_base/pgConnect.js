const { Pool } = require('pg');
const { host, user, password, portdb, database } = require('../config');

//  ************************ ACCESO A BD POSTGRESQL  ***********************
// PD: para el refactor del codigo seria bueno que anada condicionales aqui para correr con BD de QA y BD de PROD, para los tests de QA con jenkins
const pool = new Pool({
	host,
	user,
	password,
	database,
	port: portdb
});

module.exports = pool;
