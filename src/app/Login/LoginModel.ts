import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { model, Model, Schema } from 'mongoose';
import * as autoIncrement from 'mongoose-auto-increment';
import { ILogin, IRegister } from './LoginInterface';
// tslint:disable-next-line: no-var-requires
dotenv.config();

const connection: mongoose.Connection = mongoose.createConnection(process.env.MONGODB_URI_PROD);

autoIncrement.initialize(connection);

const userSchema: Schema = new Schema({

    email: {
        type: String,
        default: null
    },

    password: {
        type: String,
        default: null
    },

    role: {
        type: String,
        default: 'User'
    },

    did: {
        type: String,
        default: null
    },

    userName: {
        type: String,
        default: null
    },

    walletStatus: {
        type: Boolean,
        default: false
    },

    endpoint: {
        type: String,
        default: null
    },

    publicDid: {
        type: String,
        default: null
    },

    publicVerkey: {
        type: String,
        default: null
    },
    serviceEndpoint: {
        type: String,
        default: null
    }
});

userSchema.plugin(autoIncrement.plugin, {
    model: 'users',
    type: Number,
    field: 'userId',
    startAt: 2,
    incrementBy: 1

});

// export const Users: Model<ILogin> = model('users', userSchema);

export const Users =  mongoose.model<ILogin>('users', userSchema);

const registrationSchema: Schema = new Schema({

    companyName: {
        type: String,
        default: null
    },

    companyAddress: {
        type: String,
        default: null
    },

    companyEmailId: {
        type: String,
        default: null
    },

    companyTelephone: {
        type: String,
        default: null
    },

    companyWebsite: {
        type: String,
        default: null
    },

    registrationProof: {
        type: String,
        default: null
    },

    addressProof: {
        type: String,
        default: null
    },

    legalStatus: {
        type: String,
        default: null
    },

    typeOfCompany: {
        type: String,
        default: null
    },

    directorList: {
        type: String,
        default: null
    },
    directorIdProof: {
        type: String,
        default: null
    },

    contactPersonName: {
        type: String,
        default: null
    },

    contactPersonDesignation: {
        type: String,
        default: null
    },

    contactPersonNumber: {
        type: String,
        default: null
    },

    termsAndConditions: {
        type: String,
        default: null
    }
});


registrationSchema.plugin(autoIncrement.plugin, {
    model: 'registrations',
    type: Number,
    field: 'companyId',
    startAt: 2,
    incrementBy: 1
});

export const Registrations =  mongoose.model<IRegister>('registrations', registrationSchema);
