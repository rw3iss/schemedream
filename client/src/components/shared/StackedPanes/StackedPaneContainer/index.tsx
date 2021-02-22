import * as React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

export default class StackedPaneContainer extends React.Component<any, any> {

	constructor(props) {
		super(props);
    }
    
    render() {
        return (
            <div className="stacked-pane-container">
                {this.props.children}
            </div>
        );
    }

}
