import passport from 'passport';
import { Express } from 'express';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import LocalStrategy from 'passport-local';
import Usuario from '../api/models/Usuario';

class Passport {

  public init(app: Express) {
    app.use(passport.initialize());
    passport.use(Usuario.createStrategy());
    passport.serializeUser(Usuario.serializeUser());
    passport.deserializeUser(Usuario.deserializeUser());
    passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
      async function(jwtPayload, cb) {
        try {
          const user = await Usuario.findById(jwtPayload._id);
          return cb(null, user);
        } catch (err) {
          return cb(err);
        }
      }
    ))
  }
}

export default new Passport();