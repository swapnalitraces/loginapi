
export class LoginResponse {
    public email: string;
    public role: string;
    public userId: string;
    public userName: string;
    public did: string;
    public endpoint: string;
    public publicVerkey: string;

    constructor(email: string, role: string, userId: string, userName: string, did: string, endpoint: string, publicVerkey: string) {
        this.email = email;
        this.role = role;
        this.userId = userId;
        this.userName = userName;
        this.did = did;
        this.endpoint = endpoint;
        this.publicVerkey = publicVerkey;
    }
}
