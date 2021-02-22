import Color from './Color';

export default class Scheme {
    
    public uuid: string | undefined = undefined;

    public name: string = '';

    public colors: Array<Color>;

    constructor() {
        this.colors = [];
    }

    load(scheme) {
        this.colors = scheme.colors.filter(c => c != null).map(c => {
            let _c = new Color();
            _c.load(c);
            return _c;
        })
    }

    addColor(c) {
        this.colors.push(c);
    }

    deleteColor(c) {
        this.colors = this.colors.filter(_c => _c != c);
    }

    clone() {
        let s = new Scheme();
        s.name = '';
        s.load(this);
        return s;
    }
}