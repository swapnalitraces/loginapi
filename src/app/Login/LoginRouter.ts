import * as log4js from 'log4js';
import { HttpMethod, IHttpServer } from '../../platform/server/httpserver/HttpServer';
import { BaseResponse } from '../CommanBaseMessageResponse/BaseResponse';
import { LoggerUtil } from '../CommanBaseMessageResponse/loggerUtil';
import { LoginController } from './LoginController';

const reqLogger: log4js.Logger = log4js.getLogger('req');
const resLogger: log4js.Logger = log4js.getLogger('res');
const logger: log4js.Logger = log4js.getLogger('LoginRouter.ts');
const loggerUtil: LoggerUtil = new LoggerUtil();

reqLogger.level = process.env.LOG_LEVEL;
resLogger.level = process.env.LOG_LEVEL;
logger.level = process.env.LOG_LEVEL;
// Router does protocol and security, but not business logic, also url versioning
export class LoginRouter {
    public static register(
        httpServer: IHttpServer,
        loginController: LoginController,
    ): any {

        /**
         * Description. API to for register  
         */
        httpServer.registerRoute(
            '/user/registration/',
            [HttpMethod.Post],
            async (req: any, res: any, next: any) => {

                const params: any = await loggerUtil.getRequestObject(req.body);
                reqLogger.debug(`${JSON.stringify({ payload: params })}`);
                
                const companyName: string = req.body.CompanyName;
                const companyAddress: string = req.body.CompanyAddress;
                const companyEmailId: string = req.body.CompanyEmailId;
                const companyTelephone: string = req.body.CompanyTelephone;
                const companyWebsite: string = req.body.CompanyWebsite;
                const password: string = req.body.Password;            
                
                try {
                    const data: BaseResponse = await loginController.register(
                        companyName,
                        companyAddress,
                        companyEmailId,
                        companyTelephone,
                        companyWebsite,
                        password           
                        );
                    if (!data.success) {                        
                        resLogger.debug(JSON.stringify(data));
                        res.json(data);
                    } else {                        
                        resLogger.debug(JSON.stringify(data));
                        res.status(200).json(data);
                    }
                } catch (error) {
                    logger.error(error);
                    res.status(500).json(error.message);
                }

                next();
            }
        );

        /**
         * Description. API to facilitate for steward login  
         */
        httpServer.registerRoute(
            '/user/login/',
            [HttpMethod.Post],
            async (req: any, res: any, next: any) => {

                const params: any = await loggerUtil.getRequestObject(req.body);
                reqLogger.debug(JSON.stringify({ payload: params }));

                const email: string = req.body.Email;
                const password: string = req.body.Password;

                try {

                    const data: BaseResponse = await loginController.login(email, password);
                    if (!data.success) {
                        resLogger.debug(JSON.stringify(data));
                        res.json(data);
                    } else {
                        resLogger.debug(JSON.stringify(data));
                        res.status(200).json(data);
                    }
                } catch (error) {
                    logger.error(error);
                    res.status(500).json(error.message);
                }

                next();
            }
        );



        /**
         * Description. API to for register  
         */
        httpServer.registerRoute(
            '/user/legalProofs/',
            [HttpMethod.Post],
            async (req: any, res: any, next: any) => {

                const params: any = await loggerUtil.getRequestObject(req.body);
                reqLogger.debug(`${JSON.stringify({ payload: params })}`);
                
                const companyEmailId: string = req.body.CompanyEmailId;
                const registrationProof: string = req.body.RegistrationProof;
                const addressProof: string = req.body.AddressProof;
                const legalStatus: string = req.body.LegalStatus;         
                const typeOfCompany: string = req.body.TypeOfCompany;
                const directorList: string = req.body.DirectorList;   
                const directorIdProof: string = req.body.DirectorIdProof;   
                
                try {
                    const data: BaseResponse = await loginController.legalProofs(
                        companyEmailId,
                        registrationProof,
                        addressProof,
                        legalStatus,
                        typeOfCompany,
                        directorList,
                        directorIdProof         
                        );
                    if (!data.success) {                        
                        resLogger.debug(JSON.stringify(data));
                        res.json(data);
                    } else {                        
                        resLogger.debug(JSON.stringify(data));
                        res.status(200).json(data);
                    }
                } catch (error) {
                    logger.error(error);
                    res.status(500).json(error.message);
                }

                next();
            }
        );


        /**
         * Description. API to for register  
         */
        httpServer.registerRoute(
            '/user/contactPerson/',
            [HttpMethod.Post],
            async (req: any, res: any, next: any) => {

                const params: any = await loggerUtil.getRequestObject(req.body);
                reqLogger.debug(`${JSON.stringify({ payload: params })}`);
                
                const companyEmailId: string = req.body.CompanyEmailId;
                const contactPersonName: string = req.body.ContactPersonName;
                const contactPersonDesignation: string = req.body.ContactPersonDesignation;
                const contactPersonNumber: string = req.body.ContactPersonNumber;         
                const termsAndConditions: boolean = req.body.TermsAndConditions;               
                
                try {
                    const data: BaseResponse = await loginController.contactPerson(
                        companyEmailId,
                        contactPersonName,
                        contactPersonDesignation,
                        contactPersonNumber,
                        termsAndConditions        
                        );
                    if (!data.success) {                        
                        resLogger.debug(JSON.stringify(data));
                        res.json(data);
                    } else {                        
                        resLogger.debug(JSON.stringify(data));
                        res.status(200).json(data);
                    }
                } catch (error) {
                    logger.error(error);
                    res.status(500).json(error.message);
                }

                next();
            }
        );


    }
}
