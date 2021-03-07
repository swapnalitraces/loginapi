"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityApp = void 0;
const Express = require("express");
const mongoose = require("mongoose");
const APIResponse_1 = require("./platform/server/httpserver/APIResponse");
const ExpressHttpServer_1 = require("./platform/server/httpserver/ExpressHttpServer");
const ConsoleLogger_1 = require("./platform/server/logger/ConsoleLogger");
const LoginController_1 = require("./app/Login/LoginController");
const LoginRouter_1 = require("./app/Login/LoginRouter");
const LoginService_1 = require("./app/Login/LoginService");
class IdentityApp {
    constructor() {
        const isDebug = process.env.NODE_ENV !== 'production';
        this.logger = new ConsoleLogger_1.ConsoleLogger(isDebug, console);
        try {
            mongoose.connect(process.env.NODE_ENV === 'production'
                ? process.env.MONGODB_URI_PROD
                : `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        }
        catch (error) {
            return error.message;
        }
        this.httpServer = new ExpressHttpServer_1.ExpressHttpServer(process.env.NODE_ENV, this.logger, Express());
        const apiResponse = new APIResponse_1.IAPIResponse();
        const loginService = new LoginService_1.LoginService();
        const loginController = new LoginController_1.LoginController(loginService);
        LoginRouter_1.LoginRouter.register(this.httpServer, loginController);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.debug('ts-express:server');
            const httpPort = normalizePort(Number(process.env.PORT) || 7000);
            this.httpServer.listenOn(httpPort);
            function normalizePort(val) {
                const port = typeof val === 'string' ? parseInt(val, 10) : val;
                if (isNaN(port)) {
                    return val;
                }
                else if (port >= 0) {
                    return port;
                }
                else {
                    return 0;
                }
            }
        });
    }
    stop() {
        this.httpServer.stop();
    }
}
exports.IdentityApp = IdentityApp;
//# sourceMappingURL=app.js.map