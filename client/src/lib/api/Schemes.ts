import Scheme from '../models/Scheme';
import LocalStorage from 'client/lib/utils/LocalStorage';
import { v4 as uuidv4 } from 'uuid';
import Keys from '../Keys';

export default class Schemes {
    
    constructor() {
    }

    create() {
        let s = new Scheme();
        s.uuid = uuidv4();
        return s;
    }

    clone(scheme: Scheme) {
        let s = scheme.clone();
        s.uuid = uuidv4();
        return s;
    }

}
