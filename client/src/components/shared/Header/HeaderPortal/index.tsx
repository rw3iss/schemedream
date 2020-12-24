import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style';

export default class HeaderPortal extends React.Component<any, any> {

	constructor(props) {
        console.log("header portal")
        super(props);
        this.state = {
            mountNode: undefined
        }
	}

	componentDidMount() {
        this.setState({
            mountNode: document.getElementById('header-portal')
        })
    }

	render() {
        return this.state.mountNode ? ReactDOM.createPortal(this.props.children, this.state.mountNode) : "";
	}
	
}
