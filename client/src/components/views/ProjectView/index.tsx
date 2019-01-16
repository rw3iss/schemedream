import * as React from 'react';
import ColorScheme from 'lib/models/ColorScheme';
import ColorSchemeDesigner from 'client/components/shared/Schemes/ColorSchemeDesigner';
import './style';
import Project from 'client/lib/models/Project';

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
					<div className="button button-blue-md button-inline" onClick={() => self.onAddScheme()}>Add New Scheme</div>
                </div>

                { this.props.project.colorSchemes.map((cs, i) => {
                    return (
                        <ColorSchemeDesigner key={i} 
                            colorScheme={cs} 
                            onDeleteScheme={cs => self.onDeleteScheme(cs)}/>
                    )
                })}
            </div>)
            : null;
	}
	
}

