require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// mongodb connect MONGO ATLAS
(async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    // console.log(
    //   `Connected to Mongo! Database name: "${connection.connections[0].db.s.databaseName}"`,
    // );
    console.log(
      `Connected to Mongo! Database name: "${connection.connections[0].name}"`,
    );
  } catch (err) {
    console.log('Error connecting to Mongo database.', err);
  }
})();

// Importing ROUTES

const loginRoute = require('./routes/login');
const clientsRoute = require('./routes/clients');
// const policiesRoute = require('./routes/policies');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/login', loginRoute.router);
app.use('/api/clients', clientsRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
