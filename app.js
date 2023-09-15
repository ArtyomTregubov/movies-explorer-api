require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./utils/limiter');
const routers = require('./routes');
const handleError = require('./errors/handleError');

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const URI_MONGO = 'mongodb://localhost:27017/bitfilmsdb';

// mongoose.connect(URI_MONGO);
mongoose.connect('mongodb://admin:admin@127.0.0.1:27017/bitfilmsdb?authSource=admin');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(limiter);
app.use(requestLogger);
app.use(cors());
app.use(routers);
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(3000);
