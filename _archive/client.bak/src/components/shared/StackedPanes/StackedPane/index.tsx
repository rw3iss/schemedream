import * as React from 'react';
import { Link } from 'react-router-dom';

import './style';

export default class StackedPane extends React.Component<any, any> {

	constructor(props) {
        super(props);
    }
    
    /* componentWillReceiveProps(nextProps) {
        console.log("StackedPane receiving props", nextProps, this.props);
    } */

    render() {
        return (
            <div className={ 'stacked-pane' 
                + (this.props.active ? ' active' : '')
                + (this.props.noInvis ? ' no-invis' : '')} id={this.props.id}>
                {this.props.children}
            </div>
        );
    }

}
