"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IAPIResponse = void 0;
const jwt = require("jsonwebtoken");
class IAPIResponse {
    constructor() {
        this.secretKey = 'secret';
        this.jwtCheck = (auth) => {
            const authHeader = auth;
            if (!authHeader) {
                const error = new Error('Not authentication.');
                error['statusCode'] = 401;
                return error;
            }
            const token = authHeader.split(' ')[1];
            let decodedToken;
            try {
                decodedToken = jwt.verify(token, this.secretKey);
            }
            catch (error) {
                error.statusCode = 500;
                return error;
            }
            if (!decodedToken) {
                const error = new Error('Not authenticated.');
                error['statusCode'] = 401;
                return error;
            }
            return decodedToken;
        };
    }
}
exports.IAPIResponse = IAPIResponse;
//# sourceMappingURL=APIResponse.js.map