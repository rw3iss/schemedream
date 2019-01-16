import * as React from 'react';
import { Link } from 'react-router-dom';
import Auth from 'client/lib/Auth';
import EventBus from 'eventbusjs';

import './style';

let mounted = false;
export default class Header extends React.Component<any, any> {

	constructor(props) {
		super(props);
		const self = this;

		this.state = {
		}
	}

	componentDidMount() {
		mounted = true;
	}

	componentWillUnmount() {
		mounted = false;
	}
/* 
	tryLogout() {
		if (mounted) {
			this.setState({
				isAuthenticated: false
			})
		}

		EventBus.dispatch("USER_LOGGED_OUT");
	}
 */
	render() {
		const self = this;
		const page = this.props.location.pathname;
		let section = page;

		const sectionIdx = page.indexOf('/', 1);
		if (sectionIdx > -1) {
			section = page.substring(0, sectionIdx);
		}

		return (
			<div id="header">
				
				<div className="logo">
					<Link to="/" replace className="link">
						<span className="logo-text">Scheme Dream</span>
					</Link>
					<span className="beta">(alpha, by <a href="http://www.ryanweiss.net" target="_blank">Ryan Weiss</a>)</span>
				</div>

				<ul className="navigation">
					{ false && <li className={section == '/dashboard' ? 'active' : ''}><Link to="/invite/12387618" replace className="link">Invited</Link></li> }
				</ul>

			</div>
		);
	}
	
}
