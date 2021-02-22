import * as React from 'react';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AutoHideHeader from '../AutoHideHeader';
import Icon from '../Icon';

import './style.scss';

export default class Header extends React.Component<any, any> {

	constructor(props) {
		super(props);

		this.state = {
            autoHide: true,
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
            self.setState({
                githubStars: (r as any).stargazers_count
            })
        });
    }

    togglePinHeader = () => {
        this.setState({
            autoHide: !this.state.autoHide
        });
    }

	render() {
		const self = this;
		const page = '';//this.props.location.pathname;
		let section = page;

		const sectionIdx = page.indexOf('/', 1);
		if (sectionIdx > -1) {
			section = page.substring(0, sectionIdx);
		}

		return (
			<div id="header">

                <AutoHideHeader autoHide={this.state.autoHide} container={document.getElementById('root')} hideDelay={3000}>
				
                    <div className="logo">
                        <Link to="/" replace className="link">
                            <div className="logo-text"><span className="scheme">Scheme</span><span className="dream">Dream</span></div>
                        </Link>
                        <span className="beta">beta</span>
                    </div>

                    <a className="github" href="https://github.com/rw3iss/schemedream" target="_blank">
                        <img src="/static/img/GitHub-Mark-Light-32px.png"/>
                        <span className="stars">{this.state.githubStars} ⭐</span>
                    </a>

                    &nbsp;&nbsp;
                    <div className="info">(i)</div>
                    &nbsp;&nbsp;

                    { false && <a href="#" className="donate">Donate</a> }

                    <div id="header-portal">{ /* dynamic content from other components will go here */ }</div>

                    <div className="action pin" onClick={this.togglePinHeader}>
                        <Icon src={ this.state.autoHide ? "/static/img/icons/pin.svg" : "/static/img/icons/pin_toggle.svg" } clickable={true} />
                    </div>

                </AutoHideHeader>

			</div>
		);
	}
	
}
