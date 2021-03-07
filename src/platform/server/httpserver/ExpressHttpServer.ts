import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as Express from 'express';
import * as http from 'http';
import * as morganLogger from 'morgan';
import { ILogger } from '../logger/ILogger';
import { HttpMethod, IHttpServer } from './HttpServer';
import * as swaggerUi from 'swagger-ui-express';
import { default as configurations } from '../swagger';
import { AddressInfo } from 'net'

export class ExpressHttpServer implements IHttpServer {
  public env: string;
  public logger: ILogger;
  public express: Express.Application;

  private httpServer: http.Server;

  constructor(
    env: string | undefined,
    logger: ILogger,
    express: Express.Application,
  ) {
    // this.env = env;
    this.logger = logger;
    this.express = express;

    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
    this.express.use(morganLogger('dev'));
    this.express.use(cors());

    // cors
    // cors
    this.express.use((req: any, res: any, next: any) => {
      next();
    });

    const router: Express.Router = Express.Router();

    this.express.use('/', router);
    this.express.use('/swagger_issuer', swaggerUi.serve, swaggerUi.setup(configurations));
  }

  public registerRoute(
    path: string,
    httpMethods: HttpMethod[],
    handler: any,
  ): void {
    for (const method of httpMethods) {
      switch (method) {
        case HttpMethod.Get:
          this.express.get(path, handler);
          break;
        case HttpMethod.Post:
          this.express.post(path, handler);
          break;
        case HttpMethod.Put:
          this.express.put(path, handler);
          break;
        case HttpMethod.Patch:
          this.express.patch(path, handler);
          break;
        case HttpMethod.Delete:
          this.express.delete(path, handler);
          break;
        default:
          throw new Error('http method not yet implemented');
      }
    }
  }

  public listenOn(port: number): void {
    this.express.set('port', port);

    if (this.httpServer == null) {
      this.httpServer = http.createServer(this.express);
    }
    this.express
      .listen(port, () => {
        const addr: object = this.httpServer.address() as AddressInfo;
        const bind: string = typeof addr === 'string' ? `pipe ${addr}` : `port ${port}`;
        this.logger.debug(`Server listening on ${bind}`);
      })
      .on('error', (error: NodeJS.ErrnoException) => {
        if (error.syscall !== 'listen') {
          throw error;
        }
        const bind: string = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
        switch (error.code) {
          case 'EACCES':
            this.logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
          case 'EADDRINUSE':
            this.logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
          default:
            throw error;
        }
      });
  }

  public stop(): void {
    if (this.httpServer) {
      this.httpServer.close();
    }
  }

}
