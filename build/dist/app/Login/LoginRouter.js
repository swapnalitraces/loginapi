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
exports.LoginRouter = void 0;
const log4js = require("log4js");
const HttpServer_1 = require("../../platform/server/httpserver/HttpServer");
const loggerUtil_1 = require("../CommanBaseMessageResponse/loggerUtil");
const reqLogger = log4js.getLogger('req');
const resLogger = log4js.getLogger('res');
const logger = log4js.getLogger('LoginRouter.ts');
const loggerUtil = new loggerUtil_1.LoggerUtil();
reqLogger.level = process.env.LOG_LEVEL;
resLogger.level = process.env.LOG_LEVEL;
logger.level = process.env.LOG_LEVEL;
class LoginRouter {
    static register(httpServer, loginController) {
        httpServer.registerRoute('/user/registration/', [HttpServer_1.HttpMethod.Post], (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = yield loggerUtil.getRequestObject(req.body);
            reqLogger.debug(`${JSON.stringify({ payload: params })}`);
            const companyName = req.body.CompanyName;
            const companyAddress = req.body.CompanyAddress;
            const companyEmailId = req.body.CompanyEmailId;
            const companyTelephone = req.body.CompanyTelephone;
            const companyWebsite = req.body.CompanyWebsite;
            const password = req.body.Password;
            try {
                const data = yield loginController.register(companyName, companyAddress, companyEmailId, companyTelephone, companyWebsite, password);
                if (!data.success) {
                    resLogger.debug(JSON.stringify(data));
                    res.json(data);
                }
                else {
                    resLogger.debug(JSON.stringify(data));
                    res.status(200).json(data);
                }
            }
            catch (error) {
                logger.error(error);
                res.status(500).json(error.message);
            }
            next();
        }));
        httpServer.registerRoute('/user/login/', [HttpServer_1.HttpMethod.Post], (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = yield loggerUtil.getRequestObject(req.body);
            reqLogger.debug(JSON.stringify({ payload: params }));
            const email = req.body.Email;
            const password = req.body.Password;
            try {
                const data = yield loginController.login(email, password);
                if (!data.success) {
                    resLogger.debug(JSON.stringify(data));
                    res.json(data);
                }
                else {
                    resLogger.debug(JSON.stringify(data));
                    res.status(200).json(data);
                }
            }
            catch (error) {
                logger.error(error);
                res.status(500).json(error.message);
            }
            next();
        }));
        httpServer.registerRoute('/user/legalProofs/', [HttpServer_1.HttpMethod.Post], (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = yield loggerUtil.getRequestObject(req.body);
            reqLogger.debug(`${JSON.stringify({ payload: params })}`);
            const companyEmailId = req.body.CompanyEmailId;
            const registrationProof = req.body.RegistrationProof;
            const addressProof = req.body.AddressProof;
            const legalStatus = req.body.LegalStatus;
            const typeOfCompany = req.body.TypeOfCompany;
            const directorList = req.body.DirectorList;
            const directorIdProof = req.body.DirectorIdProof;
            try {
                const data = yield loginController.legalProofs(companyEmailId, registrationProof, addressProof, legalStatus, typeOfCompany, directorList, directorIdProof);
                if (!data.success) {
                    resLogger.debug(JSON.stringify(data));
                    res.json(data);
                }
                else {
                    resLogger.debug(JSON.stringify(data));
                    res.status(200).json(data);
                }
            }
            catch (error) {
                logger.error(error);
                res.status(500).json(error.message);
            }
            next();
        }));
        httpServer.registerRoute('/user/contactPerson/', [HttpServer_1.HttpMethod.Post], (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const params = yield loggerUtil.getRequestObject(req.body);
            reqLogger.debug(`${JSON.stringify({ payload: params })}`);
            const companyEmailId = req.body.CompanyEmailId;
            const contactPersonName = req.body.ContactPersonName;
            const contactPersonDesignation = req.body.ContactPersonDesignation;
            const contactPersonNumber = req.body.ContactPersonNumber;
            const termsAndConditions = req.body.TermsAndConditions;
            try {
                const data = yield loginController.contactPerson(companyEmailId, contactPersonName, contactPersonDesignation, contactPersonNumber, termsAndConditions);
                if (!data.success) {
                    resLogger.debug(JSON.stringify(data));
                    res.json(data);
                }
                else {
                    resLogger.debug(JSON.stringify(data));
                    res.status(200).json(data);
                }
            }
            catch (error) {
                logger.error(error);
                res.status(500).json(error.message);
            }
            next();
        }));
    }
}
exports.LoginRouter = LoginRouter;
//# sourceMappingURL=LoginRouter.js.map