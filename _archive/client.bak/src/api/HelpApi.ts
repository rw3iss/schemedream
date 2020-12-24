import BaseApi from './BaseApi';

export default class HelpApi extends BaseApi {

    static async submitFeedback(feedback: string): Promise<any> {
        console.log("API submitFeedback", feedback);

        return new Promise(async (resolve, reject) => {
            let res = await this.request('help/feedback', 'POST', { feedback: feedback });
            resolve(res);
            
            /*  // do ajax
            let res = await this.request('auth/login', 'POST', { login: creds.login, password: creds.password })
            resolve(res) */;
        });
    }

    static async test(): Promise<any> {
        console.log("API test");

        return new Promise(async (resolve, reject) => {
            let res = await this.request('test', 'GET');
            resolve(res);
        });
    }

}