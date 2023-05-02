import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errorUtils.js';

export default function errorHandlingMiddleware(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if ('type' in error) {
    if (error.type === 'forbidden') {
      return res.status(403).send(error.message);
    }

    if (error.type === 'not_found') {
      return res.status(404).send(error.message);
    }

    if (error.type === 'bad_request') {
      return res.status(400).send(error.message);
    }

    if (error.type === 'unauthorized') {
      return res.status(401).send(error.message);
    }
  }

  return res.sendStatus(500);
}
