import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import AppError from '@shared/errors/AppError';
import '@shared/infra/typeorm';
import '@shared/container';
import { dataSource } from '@shared/infra/typeorm';
import uploadConfig from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';



dataSource.initialize();

const app = express();

app.use(rateLimiter);

app.use(cors());
app.use(express.json());

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    console.log(error);

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
)


export { app };
