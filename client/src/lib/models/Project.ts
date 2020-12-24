import Scheme from './Scheme';

export default class Project {

    public uuid: string | undefined = undefined;

    public name: string = '';

    public schemes: Array<Scheme> = [];

    public recentSchemeId: string | undefined = undefined;

    public isSaved: boolean = false;

    // If project is passed (from data), hydrate this object.
    constructor(project?) {
        if (project) {
            this.loadSchemes(project.schemes);
            this.uuid = project.uuid;
            this.name = project.name;
            this.recentSchemeId = project.recentSchemeId;
        }
    }

    // Todo: just initialize color schemes in constructor
    loadSchemes(schemes): Scheme[] {
        this.schemes = schemes.filter(s => s != null).map(s => {
            let _s = new Scheme();
            _s.load(s);
            return _s;
        });
        return this.schemes;
    }

    addScheme(s): Scheme[] {
        console.log("add scheme", s)
        this.schemes.unshift(s);
        this.recentSchemeId = s.uuid;
        return this.schemes;
    }

    deleteScheme(s, isCurrent = false) {
        console.log("delete scheme", s)
        this.schemes = this.schemes.filter(_s => _s.uuid != s.uuid);
        console.log("result", this.schemes)
        if (isCurrent) {
            this.recentSchemeId = undefined;
        }
    }

    getScheme(id): Scheme | undefined {
        return this.schemes.find(s => s.uuid === id);
    }

    // Returns the most recently edited scheme, or otherwise the first one.
    getRecentScheme(): Scheme | undefined {
        let scheme = this.getScheme(this.recentSchemeId);
        if (!scheme && this.schemes.length > 0) {
            this.recentSchemeId = this.schemes[0].uuid;
            scheme = this.schemes[0];
        }
        return scheme;
    }

    saveScheme(scheme: Scheme) {
        let idx = this.schemes.findIndex(s => s.uuid == scheme.uuid);
        this.schemes[idx] = scheme;
    }

    clone(): Project {
        let p = new Project();
        p.name = '';
        p.loadSchemes(this.schemes);
        p.recentSchemeId = this.recentSchemeId;
        return p;
    }

}