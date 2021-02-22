import * as React from 'react';
import { Link } from 'react-router-dom';
import Auth from 'client/lib/Auth';
import EventBus from 'eventbusjs';

import './style.scss';

export default class EditableLabel extends React.Component<any, any> {
    textInput: HTMLInputElement | undefined;

	constructor(props) {
		super(props);

		this.state = {
			editing: false,
			label: props.value
		};

		this.onLabelClick = this.onLabelClick.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ 
			label: nextProps.value 
		});
	}

	onLabelClick() {
		this.setState({ 
			editing: true 
		});
	}

	onBlur() {
        if (this.textInput) {
			let newVal = this.textInput.value;
			this.setState({ 
				editing: false, 
				label: newVal
			});
			
			if (this.props.onValueChanged)
				this.props.onValueChanged(newVal);
        }
	}

	onTextChange(e) {
		if (this.textInput) {
			let newVal = this.textInput.value;
			this.setState({
				label: newVal
			})
		}
	}

	onKeyPress(e) {

	}
	render() {
		const self = this;

		return (
			<div className="editable-label">

				{ ! this.state.editing && <span className="label" onClick={this.onLabelClick}>{this.state.label}</span> }

				{ this.state.editing && 
					<input type="text" placeholder="" 
						value={this.state.label}
						onChange={(e) => self.onTextChange(e)}
						onKeyPress={(e) => e.key === 'Enter' ? self.onBlur() : ''}
						onBlur={this.onBlur} 
						ref={(input) => { 
							if (input) {
								this.textInput = input;
								window.setTimeout(function() { input.focus() });
							}
						}} /> 
				}

			</div>
		);
	}
};



