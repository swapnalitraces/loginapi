import { Document } from 'mongoose';

export interface ILogin extends Document {
  userId: string;
  email: string;
  password: string;
  role: string;
  walletStatus: boolean;
  did: string;
  userName: string;
  alias: string;
  endpoint: string;
  publicDid: string;
  publicVerkey: string;
  serviceEndpoint: string;
}

export interface IRegister extends Document {
  companyName : string;
  companyAddress : string;
  companyEmailId : string;
  companyTelephone : string;
  companyWebsite : string;
  registrationProof : string;
  addressProof : string;
  legalStatus: string;
  typeOfCompany: string;
  directorList: string;
  directorIdProof: string;
  contactPersonName: string;
  contactPersonDesignation: string;
  contactPersonNumber: string;
  termsAndConditions: boolean;
}
