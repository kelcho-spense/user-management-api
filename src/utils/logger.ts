import pino from 'pino';
import config from '../config/env';

const logger = pino({
    level: config.nodeEnv === 'DEVELOPMENT' ? 'info' : 'error',
    base: {
        pid: false
    },
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
});

export default logger;