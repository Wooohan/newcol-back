import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'messengerflow-server' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, ...metadata }) => {
          let msg = `${timestamp} [${level}]: ${message}`;
          const filtered = Object.fromEntries(
            Object.entries(metadata).filter(([k]) => k !== 'service')
          );
          if (Object.keys(filtered).length > 0) {
            msg += ` ${JSON.stringify(filtered)}`;
          }
          return msg;
        })
      )
    })
  ]
});

export default logger;
