
import nanoajax from 'nanoajax';
import EventBus from 'eventbusjs';
import config from 'config/config.json';

export default class BaseApi {

    // CORS defaults to true as API is running as a separate application/port
    static async request(url, method = 'GET', body = {}, isCors = true): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("Making request", config.apiBaseUri + url);
            nanoajax.ajax({
                url: config.apiBaseUri + url,
                method: method,
                headers: { 
                    'Content-Type': 'application/json', 
                    //'Credentials': 'include',
                    //'Access-Control-Allow-Credentials': 'true' 
                },
                body: JSON.stringify(body),
                cors: isCors,
                withCredentials: true // not needed?
            }, (code, response) => {
                try {
                    let r = JSON.parse(response);
                    console.log("Response", url, r);
                    
                    // Todo: app-wide error parsing should happen elsewhere / in a utility method

                    if (code >= 400) {
                        if (code == 401) {
                            EventBus.dispatch("APP_NEEDS_LOGIN", { type: 'API_ERROR', data: r } );
                        }
                        else {
                            console.log("THROWING APP ERROR");
                            EventBus.dispatch("APP_ERROR", { type: 'API_ERROR', data: r } );
                        }
                    }

                    return resolve(r);
                } catch(e) {
                    console.log("Error parsing API response: " + JSON.stringify(e));
                    EventBus.dispatch("APP_ERROR", { type: 'API_ERROR', data: response } );
                }
            });
        });
    }
}