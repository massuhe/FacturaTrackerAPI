import { Request, Response, NextFunction } from 'express';
import { promisify } from 'es6-promisify';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { CustomError } from '../../../common/errors/CustomError';
import STATUS_CODES from '../../../common/constants/statusCodes';

class AuthController {

  public async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    const authenticate = passport.authenticate('local', { session: false }, async (err, user, info) => {
      const error = err || (!user && new CustomError('Error el autenticar: El usuario no existe o las credenciales son inválidas', STATUS_CODES.UNAUTHORIZED));
      if (error) {
        return next(error);
      }
      const login = promisify((req as any).login.bind(req, user, { session: false }));
      await login();
      const token = jwt.sign({ id: user.id, email: user.username}, process.env.JWT_SECRET);
      return res.json({user: user.username, token});
    });
    authenticate(req, res);
  }

}

export default new AuthController();