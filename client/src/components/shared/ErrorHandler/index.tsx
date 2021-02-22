import * as React from 'react';
import EventBus from 'eventbusjs';

import './style.scss';

let mounted = false;
export default class ErrorHandler extends React.Component<any, any> {

	constructor(props) {
		super(props);
		const self = this;

		this.state = {
            errors: []
		}

		EventBus.addEventListener('APP_ERROR', (error) => {
            console.log("APP_ERROR", error);
            let type = error.target.type;
            let data = error.target.data;

            let message = type == 'API_ERROR' ? 'An error occurred while trying to retrieve a resource from the API.' 
                : 'An unknown error occurred.';

            let errorViewModel = {
                error: error,
                message: message,
                visible: true
            }

            if (mounted) {
                self.setState({
                    errors: [...this.state.errors, errorViewModel]
                })
            }

            window.setTimeout(() => {
                errorViewModel.visible = false
                self.forceUpdate();
            }, 4000);
		});
    }

    componentDidMount() {
        mounted = true;
    }
    
    componentWillUnmount() {
        mounted = false;
    }
    
    close() {
        const self = this;
	}
	
	render() {
        const self = this;

		return (
            <div id="error-handler" className={ self.state.errors.length == 0 ? 'hidden' : '' }>
                <div className="errors">
                    { this.state.errors.map((e, i) => {
                        return (
                            <div className={ 'error' + (e.visible ? ' visible' : '') } key={i}><span className="text">{e.message}</span></div>
                        )
                    })}
                </div>
            </div>
        );
	}
	
}
