import ColorScheme from './ColorScheme';

export default class Project {
    public colorSchemes: Array<ColorScheme>;
    
    constructor() {
        this.colorSchemes = [];
    }

    load(project) {
        this.colorSchemes = project.colorSchemes.map(s => {
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
        this.colorSchemes.push(cs);
    }

    deleteColorScheme(cs) {
        this.colorSchemes = this.colorSchemes.filter(_cs => _cs != cs);
    }
}