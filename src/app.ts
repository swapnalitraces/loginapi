import * as Express from 'express';
import * as mongoose from 'mongoose';

import { IAPIResponse } from './platform/server/httpserver/APIResponse';
import { ExpressHttpServer } from './platform/server/httpserver/ExpressHttpServer';
import { IHttpServer } from './platform/server/httpserver/HttpServer';
import { ConsoleLogger } from './platform/server/logger/ConsoleLogger';
import { ILogger } from './platform/server/logger/ILogger';

import { LoginController } from './app/Login/LoginController';
import { LoginRouter } from './app/Login/LoginRouter';
import { LoginService } from './app/Login/LoginService';

export class IdentityApp {  
 
  private readonly logger: ILogger;
  private readonly httpServer: IHttpServer;

  constructor() {
    const isDebug: boolean = process.env.NODE_ENV !== 'production';
    this.logger = new ConsoleLogger(isDebug, console);

    try {
      // tslint:disable-next-line: no-floating-promises
      mongoose.connect(
        process.env.NODE_ENV === 'production'
          ? process.env.MONGODB_URI_PROD
          : `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`,
          { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
      );
    } catch (error) {
      // tslint:disable-next-line: no-unsafe-any
      return error.message;
    }

    this.httpServer = new ExpressHttpServer(
      process.env.NODE_ENV,
      this.logger,
      Express(),
    );

    const apiResponse: IAPIResponse = new IAPIResponse();

    const loginService: LoginService = new LoginService();
    const loginController: LoginController = new LoginController(loginService);
    LoginRouter.register(this.httpServer, loginController);
    
  }

  public async start(): Promise<void> {
    this.logger.debug('ts-express:server');
    const httpPort: number = normalizePort(Number(process.env.PORT) || 7000);
    this.httpServer.listenOn(httpPort);            
    function normalizePort(val: number): number { 
      const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
      if (isNaN(port)) {
        return val;
      } else if (port >= 0) {
        return port;
      } else {
        return 0;
      }
    }
  }

  public stop(): void {
    this.httpServer.stop();
  }
}

