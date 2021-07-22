const { port, dev } = require('./config');
const pool = require('./data_base/pgConnect');
const app = require('./server');

var debug = require('debug')('my-express-app:server');
debug.log = console.debug.bind(console);

app.listen(port, async () => {
  dev === 'development'
    ? console.log(`Listening in DEVELOPMENT http://localhost:${port}`)
    : console.log(`Listening http://localhost:${port}`);
  await pool.connect()
    .then(() => console.log('Connected to DB Successful'))
    .catch(err => console.error('Connection DB error ', err.stack))
});

module.exports = app;
