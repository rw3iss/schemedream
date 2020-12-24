import { Color } from './Colors';

export default class ColorScheme {
    public name: string;
    public colors: Array<Color>;

    constructor() {
        this.colors = [];
    }

    load(scheme) {
        this.colors = scheme.colors.map(c => {
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
}