import * as jwt from 'jsonwebtoken';

export class IAPIResponse {
  public isSubmited: (message: string) => {};
  public error: (message: string) => {};

  secretKey = 'secret';

  public jwtCheck = (auth) => {
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
    } catch (error) {
      error.statusCode = 500;
      return error;
    }
    if (!decodedToken) {
      const error = new Error('Not authenticated.');
      error['statusCode'] = 401;
      return error;
    }
    return decodedToken;
  }

}
