import * as React from 'react';

import './style';

export default class Loader extends React.Component<any, any> {

	constructor(props) {
		super(props);
	}

	render() {
		let size = this.props.size || 'sm';
		
		const sizeClass = (function(s) {
			switch(s) {
				case 'sm': return 'fa';
				case 'md': return 'fa-2';
				case 'lg': return 'fa-3';
				case 'xl': return 'fa-4';
				case 'xxl': return 'fa-5';
				default: return 'fa';
			}
		})(size);

		return (
            <i className={ sizeClass + ' fa fa-spinner icon-loader fa-spin fa-refresh' } aria-hidden="true">&nbsp;</i>
		);
	}
	
}

