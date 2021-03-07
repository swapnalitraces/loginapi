import { BaseResponse } from '../CommanBaseMessageResponse/BaseResponse';
import { LoginService } from './LoginService';

export class LoginController {
    public loginService: LoginService;

    constructor(loginService: LoginService) {
        this.loginService = loginService;
    }

    /**
     * Description: Controller for service's function to facilitate user register
     * @param companyName 
     * @param companyAddress 
     * @param companyEmailId
     * @param companyTelephone
     * @param companyWebsite
     * @param password
     */
    public async register(companyName:string, companyAddress:string, companyEmailId:string, companyTelephone:string, companyWebsite:string, password: string ): Promise<BaseResponse> {
        return this.loginService.register(
            companyName,
            companyAddress,
            companyEmailId,
            companyTelephone,
            companyWebsite,
            password,
           );
    }

    /**
     * Description: Controller for service's function to user steward login   
     * @param email 
     * @param password 
     */
    public async login(email: string, password: string): Promise<BaseResponse> {
        return this.loginService.login(email, password);
    }


    /**
     * Description: Controller for service's function to facilitate user register
     * @param companyEmailId,
     * @param registrationProof,
     * @param addressProof,
     * @param legalStatus,
     * @param typeOfCompany,
     * @param directorList,
     * @param directorIdProof
     */
    public async legalProofs(companyEmailId:string, registrationProof:string, addressProof:string, legalStatus:string, typeOfCompany:string, directorList:string, directorIdProof: string ): Promise<BaseResponse> {
        return this.loginService.legalProofs(
            companyEmailId,
            registrationProof,
            addressProof,
            legalStatus,
            typeOfCompany,
            directorList,
            directorIdProof
           );
    }
    

    /**
     * Description: Controller for service's function to facilitate user register
     * @param companyEmailId,
     * @param contactPersonName,
     * @param contactPersonDesignation,,
     * @param contactPersonNumber,
     * @param termsAndConditions     
     */
    public async contactPerson(companyEmailId:string, contactPersonName:string, contactPersonDesignation:string, contactPersonNumber:string, termsAndConditions:boolean) : Promise<BaseResponse> {
        return this.loginService.contactPerson(
            companyEmailId,
            contactPersonName,
            contactPersonDesignation,
            contactPersonNumber,
            termsAndConditions       
           );
    }
}
