import * as React from 'react';
import LocalStorage from 'lib/LocalStorage';
import Project from 'lib/models/Project';
import ProjectView from 'components/views/ProjectView';
import { notify } from 'lib/utils/Notify';

import './style';

export default class Dashboard extends React.Component<any, any> {

	constructor(props: any) {
		super(props);
        const self = this;
        
		this.state = { 
            projects: [],
            project: undefined,
            hasPreviousProjects: false,
            isProjectSaved: false
		}

		// Listen for app-wide data updated events for this view
		// Todo: should we pull state from props, global store
		//EventBus.addEventListener("APP_USER_DATA_UPDATED", (d) => self.onAppUserDataUpdated(d));
	}

	componentDidMount() {
        this.setState({
            hasPreviousProjects: false,
            projects: LocalStorage.get('projects') || []
        })

        this.loadPreviousProject();
	}

    loadProject(projectName) {
        // unset project if user selects none
        if (projectName == '-') {
            //LocalStorage.set('last-project', null);
            return this.setState({
                project: undefined
            })
        }

        let project = LocalStorage.get('project-' + projectName);

        if (!project) {
            return alert("Project not found: " + projectName);
        }

		let p = new Project(projectName);
        p.load(project);

        LocalStorage.set('last-project', projectName);

        this.setState({
            project: p,
            isProjectSaved: true
		});
    }

	newProject = () => {
		let project = new Project('Untitled');
		this.setState({
            project: project,
            //projects: ['Untitled', ...this.state.projects],
            hasPreviousProjects: true
        })
	}

	saveProject = () => {
        let p = this.state.project;
        let name = '';
        
        // if aready saved, just resave
        if (p.name != 'Untitled') {
            name = p.name;
            LocalStorage.set('project-' + name, p);
        } else {
            let name = prompt("Enter a name for the project:");
            if (name == null) {
                return;
            }

            p.name = name;
            LocalStorage.set('project-' + name, this.state.project);
            LocalStorage.set('last-project', name);

            let projects = LocalStorage.get('projects') || [];

            if (!projects.includes(name)) {
                projects.push(name);
                LocalStorage.set('projects', projects);
            }

            this.setState({
                hasPreviousProjects: true,
                projects: projects
            })
        }
        
		notify("Project " + name + " saved.", 'success', 2000);
    }
    
    cloneProject = () => {
        let p = this.state.project;
        let newProject = new Project('Untitled');
        newProject.load(p);
        this.setState({
            project: newProject
        });
    }

    deleteProject = () => {
        const self = this;
        if (confirm("Are you sure you want to delete this project? This can't be undone.")) {
            let name = this.state.project.name;
            let idx = this.state.projects.findIndex((_name) => _name === name);
            this.state.projects.splice(idx,1);

            LocalStorage.remove(name);
            LocalStorage.set('projects', this.state.projects);
            LocalStorage.remove('last-project');
            this.setState({
                project: undefined,
                projects: this.state.projects,
            }, () => {
                self.forceUpdate();
            })
        }
    }

	loadPreviousProject = () => {
        let projectName = LocalStorage.get('last-project');
        if (projectName) {
            this.loadProject(projectName);
            this.setState({
                hasPreviousProjects: true
            })
        }
	}

    getAllProjects() {
        let projects = LocalStorage.get('projects');
        return projects;
    }
    
    onChangeProject = (e) => {
        if (this.state.project != undefined) {
            if (!confirm("Are you sure you want to leave the page? You will lose any unsaved changes,")) {
                return;
            }
        }
           
        this.loadProject(e.target.value);
    }

    importProject = () => {
    }

	render() {
		let self = this;

		return (
			<div className={ 'container view' } id="view-dashboard">
				<div className="actions">

                    { this.state.projects.length > 0 && 
                        <div className="load-project">
                            <span className="label">Project:</span>
                            <select id="selected-project" className="input-sm" onChange={this.onChangeProject} 
                                value={this.state.project != undefined ? this.state.project.name : "-"}>
                                <option value="-" key="-">--</option>
                                { this.state.projects.map(p => {
                                    return (<option value={p} key={p}>{p}</option>);
                                    })
                                }
                            </select>
                        </div>
                    }

					<div className="button button-blue-sm button-inline button-new-project" onClick={() => self.newProject()}>New Project</div>

                    { false && <div className="button button-blue-sm button-inline button-load-project" onClick={() => self.importProject()}>Import Project</div> }

					{ this.state.hasPreviousProject && false && 
					 	<div className="button button-blue-sm button-inline button-load-project" onClick={() => self.loadPreviousProject()}>Load Last Saved Project</div>
					}

					{ this.state.project != undefined && 
						<div className="button button-blue-sm button-inline button-save-project" onClick={() => self.saveProject()}>Save Project</div>
					}

					{ this.state.project != undefined && 
						<div className="button button-blue-sm button-inline button-copy-project" onClick={() => self.cloneProject()}>Clone Project</div>
					}

					{ this.state.project != undefined && 
						<div className="button button-red-sm button-inline button-delete-project" onClick={() => self.deleteProject()}>Delete Project</div>
					}
				</div>
				
				{ this.state.project &&
					<ProjectView project={this.state.project} />
				}

    		</div>
		);
	}

}
