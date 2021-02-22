import Project from '../models/Project';
import LocalStorage from 'lib/utils/LocalStorage';
import { v4 as uuidv4 } from 'uuid';
import Keys from '../Keys';

// Todo: integrate with backend.
export default class Projects {
    
    projects: Project[];

    // load and hydrate projects
    constructor() {
        let projects = LocalStorage.get(Keys.PROJECTS) || [];
        this.projects = projects.map(p => {
            return new Project(p);
        });
    }

    list(): Project[] {
        console.log("Projects.list", this.projects)
        return this.projects;
    }

    get(uuid): Project | undefined {
        return this.projects.find((p: Project) => p.uuid === uuid);
    }

    create(): Project {
        let p = new Project();
        p.uuid = uuidv4();
        this.projects.unshift(p);
        LocalStorage.set(Keys.PROJECTS, this.projects);
        LocalStorage.set(Keys.RECENT_PROJECT, p.uuid);
        return p;
    }

    save(p: Project): Project {
        let pIdx = this.projects.findIndex((_p: Project) => _p.uuid === p.uuid);
        this.projects[pIdx] = p;
        console.log("SAVE PROJECT", p);
        LocalStorage.set(Keys.PROJECT_PREFIX + p.uuid, p);
        LocalStorage.set(Keys.RECENT_PROJECT, p.uuid);
        LocalStorage.set(Keys.PROJECTS, this.projects);
        return p;
    }

    mostRecent(): Project | undefined {
        let uuid = LocalStorage.get(Keys.RECENT_PROJECT);
        return this.get(uuid);
    }

    delete(project: Project): Project[] {
        let pIdx = this.projects.findIndex((p: Project) => p.uuid === project.uuid);
        this.projects.splice(pIdx, 1);
        LocalStorage.remove(Keys.PROJECT_PREFIX + project.uuid);
        LocalStorage.set(Keys.PROJECTS, this.projects);
        return this.projects;
    }

    // clone(): Project {
    //     let p = new Project();
    //     p.name = '';
    //     p.recentSchemeId = this.recentSchemeId;
    //     p.loadSchemes(this.schemes);
    //     return p;
    // }

    clone(project: Project): Project {
        let p = project.clone();
        p.uuid = uuidv4();
        this.projects.unshift(p);
        LocalStorage.set(Keys.PROJECTS, this.projects);
        return p;
    }

}
