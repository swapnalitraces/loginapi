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
exports.LoginService = void 0;
const jwt = require("jsonwebtoken");
const log4js = require("log4js");
const multer = require("multer");
const BaseResponse_1 = require("../CommanBaseMessageResponse/BaseResponse");
const LoginResponse_1 = require("../CommanBaseMessageResponse/LoginResponse");
const APIResponse_1 = require("../../platform/server/httpserver/APIResponse");
const LoginModel_1 = require("./LoginModel");
const logger = log4js.getLogger('LoginService.ts');
logger.level = process.env.LOG_LEVEL;
class LoginService {
    constructor() {
        this.apiResponse = new APIResponse_1.IAPIResponse();
    }
    register(companyName, companyAddress, companyEmailId, companyTelephone, companyWebsite, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const regularExpression = /^[a-zA-Z0-9_\+-]+(\.[a-zA-Z0-9_\+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,4})$/;
            try {
                if (!companyName || !companyAddress || !companyEmailId || !companyTelephone || !companyWebsite || !companyEmailId && password == null || !password) {
                    logger.info(`register: --  Please enter valid information!`);
                    return BaseResponse_1.BaseResponse.fromError('Please enter valid information');
                }
                else if (regularExpression.test(companyEmailId)) {
                    const email = companyEmailId;
                    const existingUser = yield LoginModel_1.Users.findOne({ email });
                    logger.info(`existing user`, existingUser);
                    const userName = companyEmailId;
                    if (!existingUser) {
                        const userModel = new LoginModel_1.Users({
                            email,
                            password,
                            userName
                        });
                        yield userModel.save();
                        const registerModel = new LoginModel_1.Registrations({
                            companyName,
                            companyAddress,
                            companyEmailId,
                            companyTelephone,
                            companyWebsite
                        });
                        yield registerModel.save();
                        const registerData = { companyName: registerModel.companyName, companyAddress: registerModel.companyAddress, companyEmailId: registerModel.companyEmailId, companyTelephone: registerModel.companyTelephone, companyWebsite: registerModel.companyWebsite };
                        const userData = { email: userModel.email, role: userModel.role, userId: userModel.userId, userName: userModel.userName, userDid: userModel.did };
                        logger.info(`register: --  Registartion completed successfully!`);
                        return BaseResponse_1.BaseResponse.from(registerData, 'Registartion completed successfully');
                    }
                    else {
                        logger.info(`register: --  User already exists!`);
                        return BaseResponse_1.BaseResponse.fromError('User already exists');
                    }
                }
                else {
                    logger.info(`register: --  Please enter valid email address!`);
                    return BaseResponse_1.BaseResponse.fromError('Please enter valid email address');
                }
            }
            catch (error) {
                logger.error(`register: --  Something went wrong ${error}!`);
                return BaseResponse_1.BaseResponse.fromError(error);
            }
        });
    }
    legalProofs(companyEmailId, registrationProof, addressProof, legalStatus, typeOfCompany, directorList, directorIdProof) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!registrationProof || !addressProof || !legalStatus || !typeOfCompany || !directorList || !directorIdProof) {
                    logger.info(`legalProofs: --  Please enter valid information!`);
                    return BaseResponse_1.BaseResponse.fromError('Please enter valid information');
                }
                else {
                    const storage = multer.diskStorage({
                        destination: function (req, file, cb) {
                            cb(null, '/tmp/my-uploads');
                        },
                        filename: function (req, file, cb) {
                            cb(null, file.fieldname + '-' + Date.now());
                        }
                    });
                    const upload = multer({ storage: storage });
                    const registrationProofImg = upload.single(registrationProof);
                    logger.info(`Registration Image ${registrationProofImg}`);
                    const legalProofUpdate = yield LoginModel_1.Registrations.updateOne({ companyEmailId }, { $set: { registrationProof, addressProof, legalStatus, typeOfCompany, directorList, directorIdProof } });
                    logger.info(`legal proof data ${legalProofUpdate}`);
                    return BaseResponse_1.BaseResponse.from(legalProofUpdate, 'Legal proofs added successfully');
                }
            }
            catch (error) {
                logger.error(`legalProofs: --  Something went wrong ${error}!`);
                return BaseResponse_1.BaseResponse.fromError(error);
            }
        });
    }
    contactPerson(companyEmailId, contactPersonName, contactPersonDesignation, contactPersonNumber, termsAndConditions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!companyEmailId || !contactPersonName || !contactPersonDesignation || !contactPersonNumber || !termsAndConditions) {
                    logger.info(`contactPerson: --  Please enter valid information!`);
                    return BaseResponse_1.BaseResponse.fromError('Please enter valid information');
                }
                else {
                    const contactPersonUpdate = yield LoginModel_1.Registrations.updateOne({ companyEmailId }, { $set: { contactPersonName, contactPersonDesignation, contactPersonNumber, termsAndConditions } });
                    logger.info(`contact person data ${contactPersonUpdate}`);
                    return BaseResponse_1.BaseResponse.from(contactPersonUpdate, 'Contact person details added successfully');
                }
            }
            catch (error) {
                logger.error(`contact person: --  Something went wrong ${error}!`);
                return BaseResponse_1.BaseResponse.fromError(error);
            }
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const regularExpression = /^[a-zA-Z0-9_\+-]+(\.[a-zA-Z0-9_\+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,4})$/;
            try {
                if (!email || !email && password == null || !password) {
                    logger.info(`login: --  Please enter Email or Password!`);
                    return BaseResponse_1.BaseResponse.fromError('Please enter Email or Password');
                }
                else if (regularExpression.test(email)) {
                    const userData = yield LoginModel_1.Users.findOne({ email, password });
                    if (!userData) {
                        logger.info(`login: --  Please Enter correct Email or Password!`);
                        return BaseResponse_1.BaseResponse.fromError('Please Enter correct Email or Password');
                    }
                    else {
                        const token = jwt.sign({ email: userData.email, userId: userData.userId }, this.apiResponse.secretKey, { expiresIn: '1h' });
                        const userDetails = new LoginResponse_1.LoginResponse(userData.email, userData.role, userData.userId, userData.userName, userData.did, userData.endpoint, userData.publicVerkey);
                        userDetails['token'] = token;
                        logger.info(`login: --  Logged In Successfully!`);
                        return BaseResponse_1.BaseResponse.from(userDetails, 'Logged In Successfully');
                    }
                }
                else {
                    logger.info(`login: --  Please enter valid email address!`);
                    return BaseResponse_1.BaseResponse.fromError('Please enter valid email address');
                }
            }
            catch (error) {
                logger.error(`login: --  Something went wrong ${error}!`);
                return BaseResponse_1.BaseResponse.fromError(error);
            }
        });
    }
}
exports.LoginService = LoginService;
//# sourceMappingURL=LoginService.js.map