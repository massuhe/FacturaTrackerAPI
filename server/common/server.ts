import express from 'express';
import { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import l from './logger';
import mongoose from './mongoose';
import '../api/models/_loadModels';

const app = express();

export default class ExpressServer {

  private _routes: (app: Application) => void;
  private _errorHandlers: (app: Application) => void;

  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('appPath', root + 'client');
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/public`));
  }

  public router(routes: (app: Application) => void): ExpressServer {
    this._routes = routes;
    return this;
  }

  public errorHandler(errorHandlers: (app: Application) => void): ExpressServer {
    this._errorHandlers = errorHandlers;
    return this;
  }

  public listen(p: string | number = process.env.PORT): Application {
    swaggerify(app, this._routes, this._errorHandlers);
    const welcome = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname() } on port: ${port}}`);
    http.createServer(app).listen(p, welcome(p));
    mongoose.init();
    return app;
  }
}
