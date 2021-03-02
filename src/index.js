const { port, dev } = require('./config');

const app = require('./server');
var debug = require('debug')('my-express-app:server');
debug.log = console.debug.bind(console);

app.listen(port, function () {
  dev === 'development'
    ? console.log(`Listening in DEVELOPMENT http://localhost:${port}`)
    : console.log(`Listening http://localhost:${port}`);
});

module.exports = app;
