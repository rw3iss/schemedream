import * as React from 'react';
import Project from 'client/lib/models/Project';
import SchemeDesigner from 'client/components/schemes/SchemeDesigner';

import './style';

interface IProps {
    project: Project;
}

export default class ProjectView extends React.Component<IProps, any> {

	constructor(props) {
        super(props);
    }

    onAddScheme() {
        this.props.project.createNewColorScheme();
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

                <div className="controls">
					<div className="button button-green-sm button-inline" onClick={() => self.onAddScheme()}>Add New Scheme</div>
                </div>

                { this.props.project.schemes.map((cs, i) => {
                    return (
                        <SchemeDesigner key={i} 
                            colorScheme={cs} 
                            onDeleteScheme={cs => self.onDeleteScheme(cs)}/>
                    )
                })}
            </div>)
            : null;
	}
	
}

