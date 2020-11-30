'use strict';

const express = require('express')
const winston = require('winston')
const app = express()

const format = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
  level: 'info',
  format,
  transports: [
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

app.use((req, res, done) => {
  logger.info(req.originalUrl)
  done();
});

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(80)
