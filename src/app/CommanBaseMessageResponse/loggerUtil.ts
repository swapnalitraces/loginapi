export class LoggerUtil {
    public async getRequestObject(req: object): Promise<object> {
        try {
            const temp: any = {};
            let keys: string[];
            keys = Object.keys(req);
            keys.forEach((element: string) => {
                temp[element] = req[element];
            });
            return temp;
        } catch (e) {
            return e.toString();
        }
    }
}
