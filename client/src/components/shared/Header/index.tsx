import * as React from 'react';
import { Link } from 'react-router-dom';
import Auth from 'client/lib/Auth';
import EventBus from 'eventbusjs';

import './style';

export default class Header extends React.Component<any, any> {

	constructor(props) {
		super(props);
		const self = this;

		this.state = {
            githubStars: '-'
		}
	}

	componentDidMount() {
        this.loadGithubStarCount();
    }

    loadGithubStarCount() {
        const self = this;
        fetch('https://api.github.com/repos/rw3iss/schemedream')
        .then(r => r.json())
        .then(r => {
            console.log("github stars", )
            self.setState({
                githubStars: (r as any).stargazers_count
            })
        });
    }

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
						<div className="logo-text"><span className="scheme">Scheme</span><span className="dream">Dream</span></div>
					</Link>
					<span className="beta">(alpha, by <a href="http://www.ryanweiss.net" target="_blank">Ryan Weiss</a>)</span>
				</div>

				<ul className="navigation">
					{ false && <li className={section == '/dashboard' ? 'active' : ''}><Link to="/invite/12387618" replace className="link">Invited</Link></li> }
				</ul>

                <a className="github" href="https://github.com/rw3iss/schemedream" target="_blank">
                    <img src="/schemedream/static/img/GitHub-Mark-Light-32px.png"/>
                    <span className="stars">{this.state.githubStars} ⭐</span>
                </a>

			</div>
		);
	}
	
}
