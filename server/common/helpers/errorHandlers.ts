import { Request, Response, NextFunction, Application, ErrorRequestHandler } from 'express';
import STATUS_CODES from '../constants/statusCodes';
import { CustomError } from '../errors/CustomError';

const notFoundErrorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!(err && err.status === 404)) {
    return next(err);
  }
  res.status(STATUS_CODES.NOT_FOUND)
     .json({
       status: err.status,
       name: err.name,
       message: err.message
     });
}

const validationErrorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!(err && err.name && err.name === 'ValidationError')) {
    return next(err);
  }
  const errorProps = Object.keys(err.errors);
  // Itero en los errores para obtener un formato del tipo: { propiedadError: 'Mensaje de error' }
  const errorMessages = errorProps.reduce((agg, curr) => ({...agg, [curr]: err.errors[curr].message}), {});
  res.status(STATUS_CODES.UNPROCESSABLE_ENTITY)
     .json(errorMessages);
}

const customErrorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!(err instanceof CustomError)) {
    return next(err);
  }
  const customError = err as CustomError;
  res.status(customError.status)
     .json({message: customError.message});
}

const genericErrorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR)
     .json(err);
}

const attachErrorHandlers = (app: Application) => {
  app.use(notFoundErrorHandler);
  app.use(validationErrorHandler);
  app.use(customErrorHandler);
  app.use(genericErrorHandler);
}

export default attachErrorHandlers;