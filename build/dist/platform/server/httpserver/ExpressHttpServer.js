"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressHttpServer = void 0;
const bodyParser = require("body-parser");
const cors = require("cors");
const Express = require("express");
const http = require("http");
const morganLogger = require("morgan");
const HttpServer_1 = require("./HttpServer");
const swaggerUi = require("swagger-ui-express");
const swagger_1 = require("../swagger");
class ExpressHttpServer {
    constructor(env, logger, express) {
        this.logger = logger;
        this.express = express;
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false, limit: '5mb' }));
        this.express.use(morganLogger('dev'));
        this.express.use(cors());
        this.express.use((req, res, next) => {
            next();
        });
        const router = Express.Router();
        this.express.use('/', router);
        this.express.use('/swagger_issuer', swaggerUi.serve, swaggerUi.setup(swagger_1.default));
    }
    registerRoute(path, httpMethods, handler) {
        for (const method of httpMethods) {
            switch (method) {
                case HttpServer_1.HttpMethod.Get:
                    this.express.get(path, handler);
                    break;
                case HttpServer_1.HttpMethod.Post:
                    this.express.post(path, handler);
                    break;
                case HttpServer_1.HttpMethod.Put:
                    this.express.put(path, handler);
                    break;
                case HttpServer_1.HttpMethod.Patch:
                    this.express.patch(path, handler);
                    break;
                case HttpServer_1.HttpMethod.Delete:
                    this.express.delete(path, handler);
                    break;
                default:
                    throw new Error('http method not yet implemented');
            }
        }
    }
    listenOn(port) {
        this.express.set('port', port);
        if (this.httpServer == null) {
            this.httpServer = http.createServer(this.express);
        }
        this.express
            .listen(port, () => {
            const addr = this.httpServer.address();
            const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${port}`;
            this.logger.debug(`Server listening on ${bind}`);
        })
            .on('error', (error) => {
            if (error.syscall !== 'listen') {
                throw error;
            }
            const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
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
    stop() {
        if (this.httpServer) {
            this.httpServer.close();
        }
    }
}
exports.ExpressHttpServer = ExpressHttpServer;
//# sourceMappingURL=ExpressHttpServer.js.map