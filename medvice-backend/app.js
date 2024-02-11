const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const modelsRouter = require('./routes/models');
const newsRouter = require('./routes/news');
const {connectMongoDB, connectPostgres} = require("./database/db");
const cors = require('cors');
const multer = require('multer');

const app = express();

dotenv.config();

require('./database/sequelize');
connectMongoDB().then(r => console.log(r)).catch(e => console.log(e));

app.use(cors({origin: '*'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', usersRouter);
app.use('/models', modelsRouter);
app.use('/news', newsRouter);

module.exports = app;
