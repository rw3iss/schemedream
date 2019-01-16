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
		//this.onNewProject();
		const pp = LocalStorage.get('schemedream');
		if (pp) {
			this.setState({
				hasPreviousProject: true
			})
		}
	}

	onNewProject() {
		let p = new Project();
		//p.addColorScheme(new ColorScheme());

		this.setState({
			project: p
		})
	}

	onSaveProject() {
		LocalStorage.set('schemedream', this.state.project);
		this.setState({
			hasPreviousProject: true
		})
		alert("Project saved in browser's Local Storage.");
	}

	onLoadProject() {
		let project = LocalStorage.get('schemedream');

		let p = new Project();
        p.load(project);

        this.setState({
            project: p
		});
	}

	render() {
		let self = this;

		return (
			<div className={ 'container view' + (mounted ? ' mounted' : '') } id="view-dashboard">
				<div className="actions">
					<div className="button button-blue-md button-inline button-new-project" onClick={() => self.onNewProject()}>New Project</div>
					{ this.state.hasPreviousProject && 
					 	<div className="button button-blue-md button-inline button-load-project" onClick={() => self.onLoadProject()}>Load Last Project</div>
					}
					{ this.state.project != undefined && 
						<div className="button button-blue-md button-inline button-save-project" onClick={() => self.onSaveProject()}>Save Project</div>
					}
				</div>
				
				{ this.state.project &&
					<ProjectView project={this.state.project} />
				}

    		</div>
		);
	}

}
