import ColorScheme from './ColorScheme';

export default class Project {
    public name: string;
    public schemes: Array<ColorScheme>;
    
    constructor(name?) {
        this.name = name || '';
        this.schemes = [];
    }

    load(project) {
        this.schemes = project.schemes.map(s => {
            let _s = new ColorScheme();
            _s.load(s);
            return _s;
        });
    }

    createNewColorScheme() {
        const cs = new ColorScheme();
        this.addColorScheme(cs);
    }

    addColorScheme(cs) {
        this.schemes.push(cs);
    }

    deleteColorScheme(cs) {
        this.schemes = this.schemes.filter(_cs => _cs != cs);
    }
}