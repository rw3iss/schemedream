import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Routes from '../config/routes';
import Header from 'client/components/shared/Header';
import ErrorHandler from 'client/components/shared/ErrorHandler';
import Loader from 'client/components/shared/Loader';

import '../style/global.scss';

export default class App extends React.Component<any, any> {

	constructor(props) {
		super();
		
		// Todo: load current theme from cookie/user
		this.state = {
			loaded: false
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

	async componentWillMount() {
		//this.loadLatestUser();
		this.setState({
			loaded: true
		})
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

		// injects router/location into Header
		const HeaderComponent = withRouter(props => <Header {...props}/>);

		return (
			<div>
				<div id="app-container" className={ 'app-container ' + this.state.theme }>

					{ this.state.loaded &&
						<div className="app-view" id="app-view">

							<HeaderComponent />

							<Routes />

							<div id="view-fade"></div>

							<ErrorHandler />

						</div>
					}

					{ !this.state.loaded &&
						<div className="app-view unloaded" id="app-view">
							<HeaderComponent />
							<div className="view loaded">
								<div className="loader">
									<Loader size="xl"/>
								</div>
							</div>
							<ErrorHandler />
						</div>
					}
					
				</div>
			</div>
		);
	}
	
}
