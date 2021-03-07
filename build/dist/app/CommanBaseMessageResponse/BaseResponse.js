"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponse = void 0;
class BaseResponse {
    constructor() {
        this.success = false;
    }
    static from(data, message, success = true) {
        const response = new BaseResponse();
        response.success = success;
        response.data = data;
        response.message = message;
        return response;
    }
    static fromError(errorMessage = 'Something went wrong!') {
        return this.from(undefined, errorMessage, false);
    }
}
exports.BaseResponse = BaseResponse;
//# sourceMappingURL=BaseResponse.js.map