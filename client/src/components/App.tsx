import * as React from 'react';
import Routes from '../config/routes';
import Header from 'client/components/shared/Header';
import ErrorHandler from 'client/components/shared/ErrorHandler';
import Loader from 'client/components/shared/Loader';

import '../style/global.scss';

export default class App extends React.Component<any, any> {

	constructor(props) {
		super(props);
		
		// Todo: load current theme from cookie/user
		this.state = {
		}

		// on App start, ask backend for latest user info:
		this.bindEvents();
	}

	bindEvents() {
		const self = this;

	/* 	EventBus.addEventListener('APP_NEEDS_LOGIN', () => {
			console.log("APP_NEEDS_LOGIN");
			LocalStorage.set('currentUser', null);
			self.goToSignIn();
		});

		EventBus.addEventListener('USER_LOGGED_IN', () => {
			console.log("USER_LOGGED_IN");
			self.setState({
				currentUser: LocalStorage.get('currentUser')
			})
		});

		EventBus.addEventListener('USER_LOGGED_OUT', () => {
			console.log("USER_LOGGED_OUT");
			LocalStorage.set('currentUser', null);
			self.goToSignIn();
		}); */
	}

	async componentDidMount() {
		//this.loadLatestUser();
	}

	async loadLatestUser() {
		/* 
		if (!this.state.currentUser) {
			let userRes = await Auth.tryLoadUser();
			console.log("LOADING USER", userRes);
			
			if (userRes) {
				// okay, we found a valid user
				this.setState({
					currentUser: LocalStorage.get('currentUser')
				})
			} else {
				// redirect to signin?
			}
		} */
	}

	// goToSignIn() {
	// 	this.props.history.push('/signin');
	// }

	render() {
		const self = this;

		return (
			<div>
				<div id="app-container" className={ 'app-container ' + this.state.theme }>

                    <div className="app-view" id="app-view">

                        <Header />

                        <Routes />

                        <div id="view-fade"></div>

                        <ErrorHandler />

                    </div>
					
				</div>
			</div>
		);
	}
	
}
