"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registrations = exports.Users = void 0;
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
dotenv.config();
const connection = mongoose.createConnection(process.env.MONGODB_URI_PROD);
autoIncrement.initialize(connection);
const userSchema = new mongoose_1.Schema({
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
exports.Users = mongoose.model('users', userSchema);
const registrationSchema = new mongoose_1.Schema({
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
exports.Registrations = mongoose.model('registrations', registrationSchema);
//# sourceMappingURL=LoginModel.js.map