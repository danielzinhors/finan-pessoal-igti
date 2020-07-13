import winston from 'winston';

const { combine, timestamp, label, printf } = winston.format; // destruct modules
const myFormat = printf(({ level, message, label, timestamp }) => {
  // cria format do log
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'finan-pessoal-api' }),
  ],
  format: combine(label({ label: 'finan-pessoal-api' }), timestamp(), myFormat),
});

export default logger;
