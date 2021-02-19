const { port, dev }  = require('./config');


const app = require('./server');

app.listen(port, function() {
  dev === 'development'
    ? console.log(`Listening in DEVELOPMENT http://localhost:${port}`)
    : console.log(`Listening http://localhost:${port}`);
});

module.exports = app;
