const express = require('express');
const app = express();
const path = require('path');
const config = require('./config');
const routes = require('./routes');
const cookieParser = require('cookie-parser');

const { port } = config;

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
});

app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html')));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.use('/api', routes);

// 404 Error Handler
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(err);
});


// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = {
  app,
};
