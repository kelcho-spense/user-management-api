import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import limiter from './middlewares/rate-limiter';
import requestLogger from './middlewares/logs';
import UserRouter from './user/user.router';
import errorHandler from './middlewares/errorHandler';

const app: Application = express();  // Create an Express application

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(requestLogger);
app.use(errorHandler);

// Routes
app.get('/api/health', (req: Request, res: Response) => {
    res.send('Server is up and running');
});

app.use('/api', UserRouter);  // User routes


export default app;