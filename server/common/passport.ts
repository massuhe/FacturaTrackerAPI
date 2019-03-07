import passport from 'passport';
import { Express } from 'express';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import Usuario from '../api/models/Usuario';

interface JWTPayload {
  id: string,
  iat: number
}

class Passport {

  public init(app: Express) {
    app.use(passport.initialize());
    passport.use(Usuario.createStrategy());
    passport.serializeUser(Usuario.serializeUser());
    passport.deserializeUser(Usuario.deserializeUser());
    const jwtStrategyParams = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    };
    passport.use(new JWTStrategy(jwtStrategyParams, this._verifyFunction));
  }

  private async _verifyFunction(jwtPayload: JWTPayload, cb: any): Promise<any> {
    try {
      const user = await Usuario.findById(jwtPayload.id);
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }

}

export default new Passport();