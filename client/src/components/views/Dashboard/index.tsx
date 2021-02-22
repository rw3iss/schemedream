import * as React from 'react';
import LocalStorage from 'lib/utils/LocalStorage';
import Project from 'lib/models/Project';
import Scheme from 'lib/models/Scheme';
import Color from 'lib/models/Color';
import HeaderPortal from 'components/shared/Header/HeaderPortal';
import { notify } from 'lib/utils/Notify';
import CustomDropdown from 'components/shared/controls/CustomDropdown';
import SchemeDesigner from 'components/schemes/SchemeDesigner';
import SwatchSelect from './SwatchSelect';
import Icon from 'components/shared/Icon';
import Keys from 'lib/Keys';
import SD from 'lib/api/SchemeDream';

import './style.scss';

interface IState {
    projects: Project[];
    project: Project | undefined;
    scheme: Scheme | undefined;
    isProjectSaved: boolean;
}

export default class Dashboard extends React.Component<any, IState> {

	constructor(props: any) {
		super(props);
		this.state = { 
            projects: [],
            project: undefined,
            scheme: undefined,
            isProjectSaved: true
		}
	}

	componentDidMount() {
        this.loadProjects();
        this.loadRecentProject();
	}

    loadProjects() {
        let p = SD.projects.list();
        this.setState({ projects: SD.projects.list() })
    }

	loadRecentProject() {
        let project = SD.projects.mostRecent();
        if (project) {
            this.loadProject(project)
        }
	}
 
    // Load given project and it's most recent (or first) scheme.
    loadProject(project: Project | undefined) {
        if (!project) {
            return notify("Error loading project.");
        }

        this.setState({ 
            project, 
            scheme: project.getRecentScheme()
        });

        LocalStorage.set(Keys.RECENT_PROJECT, project.uuid);
        notify("Recent project loaded.");
        console.log("scheme loaded", project.getRecentScheme());
    }

    // Start a new project with an initial empty scheme.
	newProject = () => {
        let p = SD.projects.create();
        let s = SD.schemes.create();
        p.addScheme(s);
        SD.projects.save(p);

		this.setState({
            project: p,
            scheme: p.getRecentScheme(),
            projects: SD.projects.list()
        })
	}

	saveProject = () => {
        SD.projects.save(this.state.project!);
		notify("Project " + this.state.project!.name + " saved.", 'success', 2000);
    }
    
    cloneProject = () => {
        let project = SD.projects.clone(this.state.project!);
        this.setState({ 
            project,
            projects: SD.projects.list()
        });
    }

    deleteProject = () => {
        const self = this;
        if (confirm("Are you sure you want to delete this project? It can't be undone.")) {
            SD.projects.delete(this.state.project!);
            LocalStorage.remove(Keys.RECENT_PROJECT);
            this.setState({
                project: undefined,
                scheme: undefined,
                projects: SD.projects.list()
            });
        }
    }
    
    onChangeProject = (e) => {
        if (this.state.project != undefined) {
            if (!confirm("Are you sure you want to change to another project, and lose unsaved changes?")) {
                return;
            }
        }

        let p = SD.projects.get(e.target.value);
        this.loadProject(p);
    }

    onChangeScheme = (e) => {
        if (this.state.project != undefined) {
            if (!confirm("Are you sure you want to change the scheme, and lose unsaved changes?")) {
                return;
            }
        }

        let s = this.state.project!.getScheme(e.target.value);
        console.log("change scheme", e.target.value, s);

        this.loadScheme(s!);
    }

    newScheme() {
        let s = SD.schemes.create();
        console.log("new scheme", this.state.project, s);
        this.state.project!.addScheme(s);
        SD.projects.save(this.state.project!);
        this.loadScheme(s);
    }

    // Todo: load from external project (ie. public schemes)
    loadScheme(s: Scheme) {
        console.log("loadScheme", s);
        this.state.project!.recentSchemeId = s.uuid;
        SD.projects.save(this.state.project!); // todo: ?
        this.setState({
            scheme: s
        });
    }

    cloneScheme = () => {
        // SD.schemes.clone(this.state.project.currentScheme);
    }

    deleteScheme = () => {
        if (confirm("Are you sure you want to delete this scheme? It can't be undone.")) {
            console.log("delete scheme");
            this.state.project!.deleteScheme(this.state.scheme);
            SD.projects.save(this.state.project!);
            this.setState({
                scheme: this.state.project!.getRecentScheme()
            });
        }
    }

    onColorSelected = () => {
    }    
    
    // When a color is added from toolbar and designer, save the scheme and project.
    onColorAdded = (color?: Color) => {
        console.log("color added", color, this.state.scheme);
        this.state.scheme!.addColor(color);
        this.state.project!.saveScheme(this.state.scheme!);
        SD.projects.save(this.state.project!);
        this.forceUpdate();
    }
    
    onColorDeleted = () => {
    }

    onShowAllColors = () => {
    }

    onHideAllColors = () => {
    }

	render() {
        let self = this;
        console.log("schemes", this.state.project)

		return (
			<div className={ 'container view' } id="view-dashboard">    
			
                { /* This header content gets injected into the site Header portal dynamically */ }
                <HeaderPortal>
                    
                    <div id="dashboard-header">

                        <div className="actions left">

                            { this.state.projects.length > 0 &&
                                <div className="action select-project">
                                    <CustomDropdown label="Project:" items={this.state.projects
                                        .map(p => { return { label: p.name || 'Untitled', value: p.uuid } })} 
                                        onChange={this.onChangeProject} />
                                </div> 
                            }

                            <div className="action create" onClick={self.newProject}>
                                <Icon src="/static/img/icons/add.svg" clickable={true} />
                            </div>

                            { this.state.project && 
                                <React.Fragment>

                                    <div className="action clone" onClick={() => self.cloneProject()}>
                                        <Icon src="/static/img/icons/clone.svg" clickable={true} />
                                    </div>

                                    <div className="action trash" onClick={() => self.deleteProject()}>
                                        <Icon src="/static/img/icons/trash.svg" clickable={true} />
                                    </div>

                                    <div className="action select-scheme">
                                        <CustomDropdown label="Scheme:" items={this.state.project.schemes
                                            .map(s => { console.log("S", s); return { label: s.name || 'Untitled', value: s.uuid } })} 
                                            onChange={this.onChangeScheme} />
                                    </div> 

                                    <div className="controls">
                                        <div className="action create-scheme" onClick={() => self.newScheme()}>
                                            <Icon src="/static/img/icons/add.svg" clickable={true} />
                                        </div>
                                    </div>

                                    { this.state.scheme && 
                                        <React.Fragment>
                                            <div className="action clone" onClick={() => self.cloneScheme()}>
                                                <Icon src="/static/img/icons/clone.svg" clickable={true} />
                                            </div>

                                            <div className="action trash" onClick={() => self.deleteScheme()}>
                                                <Icon src="/static/img/icons/trash.svg" clickable={true} />
                                            </div>

                                            <SwatchSelect scheme={this.state.scheme!}
                                                onColorSelected={this.onColorSelected}
                                                onAddColor={this.onColorAdded}
                                                onDeleteColor={this.onColorDeleted}
                                                onShowAllColors={this.onShowAllColors}
                                                onHideAllColors={this.onHideAllColors}
                                            />
                                        </React.Fragment>
                                    }

                                </React.Fragment>
                            }

                        </div>

                        <div className="actions right">

                            <div className="action">
                                <Icon src="/static/img/icons/eye.svg" clickable={true} />
                            </div>
                            
                            <div className="action">
                                <Icon src="/static/img/icons/settings.svg" clickable={true} />
                            </div>

                            <div className="action">
                                <Icon src="/static/img/icons/user.svg" clickable={true} />
                            </div>

                        </div>

                    </div>

                </HeaderPortal>

				{ this.state.scheme &&
                    <SchemeDesigner scheme={this.state.scheme} 
                        onAddColor={this.onColorAdded} 
                        onDeleteColor={this.onColorAdded} 
                        isEditable={true}
                    />
				}

    		</div>
		);
	}

}
