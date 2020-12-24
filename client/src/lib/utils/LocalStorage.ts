export default class LocalStorage {

    static get(id: string): any {
        // Look in local storage for object
        let key = this._getClassTypeName(id);
        let str = window.localStorage.getItem(key);
        if (str != null) {
            try {
                let object = JSON.parse(str);
                return object;
            } catch(e) {
                return null;
            }
        }

        return str;
    }

    static set(key: string, value: any) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    static remove(key: string) {
        window.localStorage.removeItem(key);
    }

    private static _getClassTypeName<T>(id: string): string {
        return id;
    }

}
