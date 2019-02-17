import { Request, Response, NextFunction, Handler } from 'express';

const catchErrors = (asyncFunction: Handler): Handler => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  return asyncFunction(req, res, next).catch(next);
}

export default catchErrors;