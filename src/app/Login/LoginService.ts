
import * as jwt from 'jsonwebtoken';
import * as log4js from 'log4js';
import * as multer from 'multer';

import { BaseResponse } from '../CommanBaseMessageResponse/BaseResponse';
import { LoginResponse } from '../CommanBaseMessageResponse/LoginResponse';
import { IAPIResponse } from '../../platform/server/httpserver/APIResponse';
import { ILogin, IRegister } from './LoginInterface';
import { Registrations, Users } from './LoginModel';

const logger: log4js.Logger = log4js.getLogger('LoginService.ts');
logger.level = process.env.LOG_LEVEL;

export class LoginService {

    apiResponse = new IAPIResponse();
    /**
     * Description: Service function to facilitate user registration
     * @param companyName 
     * @param companyAddress 
     * @param companyEmailId      
     * @param companyTelephone 
     * @param companyWebsite 
     * @param password 
     */

    public async register(
        companyName:string, 
        companyAddress:string, 
        companyEmailId:string, 
        companyTelephone:string, 
        companyWebsite:string, 
        password: string,  
        ): Promise<BaseResponse> {
        const regularExpression: RegExp = /^[a-zA-Z0-9_\+-]+(\.[a-zA-Z0-9_\+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,4})$/;
        try {
            if (!companyName || !companyAddress || !companyEmailId || !companyTelephone || !companyWebsite || !companyEmailId && password == null || !password ) {
                logger.info(`register: --  Please enter valid information!`);
                return BaseResponse.fromError('Please enter valid information');

            } else if (regularExpression.test(companyEmailId)) {
                // tslint:disable-next-line: await-promise                
                const email: string = companyEmailId;
                const existingUser: ILogin = await Users.findOne({ email });

                logger.info(`existing user`, existingUser);

                const userName: string = companyEmailId;
                // const email: string = companyEmailId;
                if (!existingUser) {
                    const userModel: ILogin = new Users({
                        email,
                        password,
                        userName
                    });
                    await userModel.save();           

                    const registerModel: IRegister = new Registrations({
                        companyName,
                        companyAddress,
                        companyEmailId,
                        companyTelephone,
                        companyWebsite                
                    })
                    await registerModel.save();
                    const registerData: any = { companyName: registerModel.companyName, companyAddress: registerModel.companyAddress, companyEmailId: registerModel.companyEmailId, companyTelephone:registerModel.companyTelephone, companyWebsite:registerModel.companyWebsite}                                 
                   
                    const userData: any = { email: userModel.email, role: userModel.role, userId: userModel.userId, userName: userModel.userName, userDid: userModel.did };
                    logger.info(`register: --  Registartion completed successfully!`);
                    return BaseResponse.from(registerData, 'Registartion completed successfully');
                } else {
                    logger.info(`register: --  User already exists!`);
                    return BaseResponse.fromError('User already exists');
                }
            } else {
                logger.info(`register: --  Please enter valid email address!`);
                return BaseResponse.fromError('Please enter valid email address');
            }
        } catch (error) {
            logger.error(`register: --  Something went wrong ${error}!`);
            return BaseResponse.fromError(error);
        }
    }

    /**
    * Description: Service function to facilitate user registration
    * @param registrationProof 
    * @param addressProof 
    * @param legalStatus
    * @param typeOfCompany
    * @param directorList
    * @param directorIdProof
    */
    public async legalProofs(companyEmailId:string, registrationProof:string, addressProof:string, legalStatus:string, typeOfCompany:string, directorList:string, directorIdProof: string): Promise<BaseResponse> {      
        try {
            
            if (!registrationProof || !addressProof || !legalStatus || !typeOfCompany || !directorList || !directorIdProof) {
                logger.info(`legalProofs: --  Please enter valid information!`);
                return BaseResponse.fromError('Please enter valid information');
            }
             else 
            {
                const storage = multer.diskStorage({
                    destination: function (req, file, cb) {
                      cb(null, '/tmp/my-uploads')
                    },
                    filename: function (req, file, cb) {
                      cb(null, file.fieldname + '-' + Date.now())
                    }
                  })
                   
                const upload = multer({ storage: storage })

                const registrationProofImg = upload.single(registrationProof);

                logger.info(`Registration Image ${registrationProofImg}`);

                const legalProofUpdate:any = await Registrations.updateOne({ companyEmailId }, { $set: { registrationProof, addressProof, legalStatus, typeOfCompany, directorList, directorIdProof} });   
                logger.info(`legal proof data ${legalProofUpdate}` );             

                return BaseResponse.from(legalProofUpdate, 'Legal proofs added successfully');                               
            }
        } catch (error) {
            logger.error(`legalProofs: --  Something went wrong ${error}!`);
            return BaseResponse.fromError(error);
        }
    }

    /**
    * Description: Service function to facilitate user registration    
    * @param contactPersonName
    * @param contactPersonDesignation
    * @param contactPersonNumber
    * @param termsAndConditions
    */
   public async contactPerson(companyEmailId:string, contactPersonName:string, contactPersonDesignation:string, contactPersonNumber:string, termsAndConditions:boolean): Promise<BaseResponse> {      
    try {
        
        if ( !companyEmailId || !contactPersonName || !contactPersonDesignation || !contactPersonNumber || !termsAndConditions) {
            logger.info(`contactPerson: --  Please enter valid information!`);
            return BaseResponse.fromError('Please enter valid information');
        }
         else 
        {       
            const contactPersonUpdate:any = await Registrations.updateOne({ companyEmailId }, { $set: { contactPersonName ,contactPersonDesignation ,contactPersonNumber , termsAndConditions } });   
            logger.info(`contact person data ${contactPersonUpdate}` );             

            return BaseResponse.from(contactPersonUpdate, 'Contact person details added successfully');                               
        }
    } catch (error) {
        logger.error(`contact person: --  Something went wrong ${error}!`);
        return BaseResponse.fromError(error);
    }
}


    // public async register(email: string, password: string): Promise<BaseResponse> {
    //     const regularExpression: RegExp = /^[a-zA-Z0-9_\+-]+(\.[a-zA-Z0-9_\+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,4})$/;
    //     try {
    //         if (!email || !email && password == null || !password) {
    //             logger.info(`register: --  Please enter Email or Password!`);
    //             return BaseResponse.fromError('Please enter Email or Password');

    //         } else if (regularExpression.test(email)) {
    //             // tslint:disable-next-line: await-promise                
    //             const existingUser: ILogin = await Users.findOne({ email });

    //             const userName: string = email;
    //             if (!existingUser) {
    //                 const userModel: ILogin = new Users({
    //                     email,
    //                     password,
    //                     userName
    //                 });
    //                 await userModel.save();
    //                 const userData: any = { email: userModel.email, role: userModel.role, userId: userModel.userId, userName: userModel.userName, userDid: userModel.did };
    //                 logger.info(`register: --  Registartion completed successfully!`);
    //                 return BaseResponse.from(userData, 'Registartion completed successfully');
    //             } else {
    //                 logger.info(`register: --  User already exists!`);
    //                 return BaseResponse.fromError('User already exists');
    //             }
    //         } else {
    //             logger.info(`register: --  Please enter valid email address!`);
    //             return BaseResponse.fromError('Please enter valid email address');
    //         }
    //     } catch (error) {
    //         logger.error(`register: --  Something went wrong ${error}!`);
    //         return BaseResponse.fromError(error);
    //     }
    // }



    /**
     * Description: Service function to facilitate user login   
     * @param email 
     * @param password 
     */
    public async login(email: string, password: string): Promise<BaseResponse> {
        const regularExpression: RegExp = /^[a-zA-Z0-9_\+-]+(\.[a-zA-Z0-9_\+-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.([a-zA-Z]{2,4})$/;
        try {
            if (!email || !email && password == null || !password) {
                logger.info(`login: --  Please enter Email or Password!`);
                return BaseResponse.fromError('Please enter Email or Password');

            } else if (regularExpression.test(email)) {
                // tslint:disable-next-line: await-promise
                const userData: ILogin = await Users.findOne({ email, password });
                if (!userData) {
                    logger.info(`login: --  Please Enter correct Email or Password!`);
                    return BaseResponse.fromError('Please Enter correct Email or Password');
                } else {
                    const token = jwt.sign({ email: userData.email, userId: userData.userId },
                        this.apiResponse.secretKey,
                        { expiresIn: '1h' });
                    const userDetails: LoginResponse = new LoginResponse(userData.email, userData.role, userData.userId, userData.userName, userData.did, userData.endpoint, userData.publicVerkey);
                    userDetails['token'] = token;

                    logger.info(`login: --  Logged In Successfully!`);

                    return BaseResponse.from(userDetails, 'Logged In Successfully');
                }
            } else {
                logger.info(`login: --  Please enter valid email address!`);
                return BaseResponse.fromError('Please enter valid email address');
            }
        } catch (error) {
            logger.error(`login: --  Something went wrong ${error}!`);
            return BaseResponse.fromError(error);
        }
    }
}



