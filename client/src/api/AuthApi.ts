
import BaseApi from './BaseApi';

export default class AuthApi extends BaseApi {
/* 
    static async login(credentials: Credentials): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let res = await this.request('auth/login', 'POST', credentials);
            return resolve(res);
        });
    }
 */
    // Tells the backend to clear HttpOnly cookies for the current user.
    static async logout(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let res = await this.request('auth/logout', 'POST');
            return resolve(res);
        });
    }

    // asks server if user is logged in (only server can read the HttpOnly cookie)
    static async getCurrentUser(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let res = await this.request('users/current', 'GET');
            return resolve(res);
        });
    }

    static async resetPassword(login: string) {
        return new Promise(async (resolve, reject) => {
            let res = await this.request('auth/resetPassword', 'POST', { email: login });
            return resolve(res);
        });
    }

    static async validateSessionToken(token: string) {
        return new Promise(async (resolve, reject) => {
            let res = await this.request('auth/validateSessionToken', 'POST', { token: token });
            return resolve(res);
        });
    }

}