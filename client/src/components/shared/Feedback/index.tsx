import * as React from 'react';
import { Link } from 'react-router-dom';
import EventBus from 'eventbusjs';
import HelpApi from 'api/HelpApi';
import StackedPaneContainer from 'components/shared/StackedPanes/StackedPaneContainer';
import StackedPane from 'components/shared/StackedPanes/StackedPane';

import './style.scss';

let mounted = false;
export default class Feedback extends React.Component<any, any> {
	private feedbackInput: HTMLTextAreaElement | null;

	constructor(props) {
		super(props);
		const self = this;

		this.state = {
			loaded: false,
			feedbackOpen: false,
			status: '',
			activePane: 'feedback-form'
		}

		EventBus.addEventListener('OPEN_FEEDBACK', () => {
			if (mounted)
				self.openFeedback();
		});
	}

	componentDidMount() {
		mounted = true;
	}

	componentWillUnmount() {
		mounted = false;
	}
	
	openFeedback() {
		const self = this;

		this.setState({
			feedbackOpen: true,
			activePane: 'feedback-form'
		})

        window.setTimeout(function() {
            self.setState({
				loaded: true
            })
		}, 0);
	}

    async onSubmit() {
        const self = this;

		// Todo: get user?
		self.setState({
			activePane: 'waiting'
		})

		if (this.feedbackInput) {
			let feedback = this.feedbackInput.value;
		
			// send feedback to backend
			let res = await HelpApi.submitFeedback(feedback);
			if (!res.success) {
				return this.setState({
					status: 'error',
					error: res.error
				})
			} else {
				this.onSuccess();
			}
		}
	}
	
	onSuccess() {
		const self = this;

		self.setState({
			//status: 'success',
			activePane: 'success'
		});

		window.setTimeout(function() {
			self.close();
		}, 1000);
	}

    close() {
        const self = this;

        self.setState({
			loaded: false
        });

        window.setTimeout(function() {
			self.setState({
				feedbackOpen: false
			})
        }, 250); // same as css transition time
	}
	
	render() {
		const self = this;

		return (
			<div id="feedback">
				
				<div className="btn-feedback button-glass-md" onClick={() => this.openFeedback()}>
                    Got feedback?
				</div>
			
				{ this.state.feedbackOpen &&
					<div className={ 'feedback-panel modal' 
							+ (this.state.loaded ? ' loaded' : '')
							+ (this.state.activePane == 'success' ? ' success' : '')}>
						<div className="inner">
					
							<StackedPaneContainer>
								<StackedPane id="waiting-pane" active={this.state.activePane == 'waiting'}>
									<div className="waiting">
										<div>Submitting...</div>
										<span className="icon-spinner">&nbsp;</span>
									</div>
								</StackedPane>

								<StackedPane id="content-pane" active={this.state.activePane == 'feedback-form'} noInvis="true">
									<div className="content">
										<h1>Feedback</h1>
										<div className="page-header-sub">Please enter any ideas, suggestions, or complaints below. Your feedback is greatly appreciated and will help shape the future of our platform.</div>

										<form id="feedback-form" className="form">
											<div className="form-row">
												<div className="input-wrapper">
													<textarea className="input-lg" ref={(i) => { this.feedbackInput = i; }}/>
												</div>
											</div>
										</form>
									</div>

									{ this.state.status != '' && 
										<div className={'status ' + this.state.status}>
											{ this.state.status == 'error' && <span>{this.state.error}</span> }
										</div>
									}

									<div className="actions">
										<div className="button-blue-md button" onClick={() => self.close()}>Cancel</div>
										<div className="button-blue-md button" onClick={() => self.onSubmit()}>Submit</div>
									</div>
								</StackedPane>

								<StackedPane id="result-pane" active={this.state.activePane == 'success'}>
									<div className="success">Thanks for your feedback!</div>
								</StackedPane>
							</StackedPaneContainer>

						</div>
					</div>
				}
				
			</div>
		);
	}
	
}
