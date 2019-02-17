import './common/env';
import Server from './common/server';
import routes from './routes';
import errorHandlers from './common/helpers/errorHandlers';

const port = parseInt(process.env.PORT);
export default new Server()
  .router(routes)
  .errorHandler(errorHandlers)
  .listen(port);
