import * as React from 'react';
import Auth from 'client/lib/Auth';
import UserUtils from 'client/lib/utils/UserUtils';
//import UsersApi from 'client/api/UsersApi';
import EventBus from 'eventbusjs';
import LocalStorage from 'lib/LocalStorage';
import Project from 'lib/models/Project';
import ProjectView from 'components/views/ProjectView';

import './style';
import ColorScheme from 'client/lib/models/ColorScheme';

let mounted = true;
export default class Dashboard extends React.Component<any, any> {

	constructor(props: any) {
		super(props);
        const self = this;
        
		this.state = { 
			mounted: false,
			project: undefined,
			hasPreviousProject: false
		}

		// Listen for app-wide data updated events for this view
		// Todo: should we pull state from props, global store
		//EventBus.addEventListener("APP_USER_DATA_UPDATED", (d) => self.onAppUserDataUpdated(d));
	}

	componentDidMount() {
        console.log("mounted")
        this.setState({
            hasPreviousProject: LocalStorage.get('last-project') ? true : false,
            projects: LocalStorage.get('projects')
        })

        this.loadProject(LocalStorage.get('last-project'))
	}

    loadProject(projectName) {
        if (projectName == '-') {
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

        console.log("project loaded", p);

        this.setState({
            project: p
		});
    }

	onNewProject() {
		let project = new Project('Untitled');
		//p.addColorScheme(new ColorScheme());
		this.setState({project})
	}

	onSaveProject() {
        let name = prompt("Enter a name for the project:");
        LocalStorage.set('project-' + name, this.state.project);
        LocalStorage.set('last-project', name);

        let projects = LocalStorage.get('projects') || [];

        if (!projects.includes(name)) {
            projects.push(name);
            LocalStorage.set('projects', projects);
        }

		this.setState({
            hasPreviousProject: true,
            projects: projects
        })
        
		alert("Project saved in browser's Local Storage.");
	}

	loadPreviousProject() {
        let projectName = LocalStorage.get('last-project');
        this.loadProject(projectName);
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

	render() {
		let self = this;

		return (
			<div className={ 'container view' } id="view-dashboard">
				<div className="actions">

					<div className="button button-blue-sm button-inline button-new-project" onClick={() => self.onNewProject()}>New Project</div>
                    
                    { this.state.hasPreviousProject && 
                        <div className="load-project">
                            <span className="label">Load:</span>
                            <select id="selected-project" className="input-sm" onChange={this.onChangeProject}>
                                <option value="-" key="-" selected={this.state.project == undefined}>--</option>
                                { this.state.projects.map(p => {
                                    return (<option value={p} key={p} selected={this.state.project != undefined && this.state.project.name == p}>{p}</option>);
                                    })
                                }
                            </select>
                        </div>
                    }

					{ this.state.hasPreviousProject && false && 
					 	<div className="button button-blue-sm button-inline button-load-project" onClick={() => self.loadPreviousProject()}>Load Last Saved Project</div>
					}

					{ this.state.project != undefined && 
						<div className="button button-blue-sm button-inline button-save-project" onClick={() => self.onSaveProject()}>Save Project</div>
					}
				</div>
				
				{ this.state.project &&
					<ProjectView project={this.state.project} />
				}

    		</div>
		);
	}

}
