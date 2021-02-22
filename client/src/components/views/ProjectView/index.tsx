import * as React from 'react';
import Project from 'lib/models/Project';
import SchemeDesigner from 'components/schemes/SchemeDesigner';

import './style.scss';

interface IProps {
    project: Project;
}

export default class ProjectView extends React.Component<IProps, any> {

	constructor(props) {
        super(props);
        console.log("project view")
    }

    onAddScheme() {
        this.props.project.newColorScheme();
        this.forceUpdate();
    }
    
    onDeleteScheme(cs) {
        if (confirm("Are you sure you want to delete this color scheme?")) {
            this.props.project.deleteColorScheme(cs);
            this.forceUpdate();
        }
    }

	render() {
        const self = this;
        return this.props.project ? 
            (<div className="project">

                { this.props.project.schemes.map((cs, i) => {
                    return (
                        <SchemeDesigner key={i} 
                            scheme={cs} 
                            onDeleteScheme={cs => self.onDeleteScheme(cs)}/>
                    )
                })}
                
            </div>)
            : null;
	}
	
}

