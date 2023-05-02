import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorized } from '../utils/errorUtils.js';

export default async function validateToken(
  req: Request,
  res: Response,
  nest: NextFunction,
) {
  const { authorization } = req.headers;
  if (!authorization) throw unauthorized('Erro com authorization header');

  const token = authorization?.replace('Bearer ', '');
  if (!token) throw unauthorized('Falta o token');

  try {
    const secretKey = process.env.JWT_SECRET;
    const { userId } = jwt.verify(token, secretKey);
    res.locals.userId = userId;
  } catch (error) {
    const { expiredAt } = error;
    if (expiredAt) return res.status(401).send('token expirou');

    return res.status(401).send('token invalido');
  }

  return nest();
}
