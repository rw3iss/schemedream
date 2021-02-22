// Manages client authentication
import LocalStorage from 'lib/utils/LocalStorage';
//import AuthApi from 'api/AuthApi';
//import UsersApi from 'api/UsersApi';
import CookieUtils from 'lib/utils/CookieUtils';
import EventBus from 'eventbusjs';

export default class Auth {

/*     // Asks the backend to look for existing user from the access_token.
    static async tryLoadUser() {
        let userRes = await AuthApi.getCurrentUser();

        if (userRes.success) {
            LocalStorage.set('currentUser', userRes.data);
            console.log("Dispatching event", "APP_USER_DATA_UPDATED", userRes.data);
            EventBus.dispatch("APP_USER_DATA_UPDATED", userRes.data);
            return userRes.data;
        } else {
            LocalStorage.set('currentUser', null);
        }

        return null;
    }

    static getCurrentUser(): IUser | null {
        return {} as IUser;

        //let user = LocalStorage.get('currentUser');
        //return user ? user as IUser : null;
    }

    // A light method which can assume "soft" authentication if a user object exists.
    // The app will still check for "real" authentication on bootup/api requests.
    static isAuthenticated() {
        return LocalStorage.get('currentUser') != null;
    }

    // Asks backend API to login
    static async login(credentials) {
        let loginRes = await AuthApi.login(credentials);
        
        if (loginRes.success) {
            console.log("LOGIN SUCCESS", loginRes);
            LocalStorage.set('currentUser', loginRes.data);
        } else {
            console.log("LOGIN FAIL", loginRes);
        }
        return Promise.resolve(loginRes);
    }

    static async logout() {
        console.log("Logout");
        let logoutRes = await AuthApi.logout();
        LocalStorage.set('currentUser', null);
        return Promise.resolve(true);
    } */

}
    