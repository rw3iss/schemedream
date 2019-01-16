import * as React from 'react';
import EventBus from 'eventbusjs';
import ColorPickingArea from 'components/shared/Schemes/ColorPickingArea';
import { Color } from 'lib/models/Colors';

import './style';
import ColorScheme from 'client/lib/models/ColorScheme';

interface IProps {
	colorScheme: ColorScheme;
	onDeleteScheme: (ColorScheme) => void;
}

let mounted = true;
export default class ColorSchemeDesigner extends React.Component<IProps, any> {

	constructor(props: any) {
		super(props);
        const self = this;

		this.state = {
			colorScheme: this.props.colorScheme,
			selectedColors: [], // colors that are open/editing,
			hasChanges: false
		}

		this.onAddNewColor.bind(this);
	}

	componentDidMount() {
		//this.loadScheme(this.props.colorScheme);
	}

    componentWillReceiveProps(nextProps) {
		if (nextProps.colorScheme != this.props.colorScheme) {
			this.clearState();
		}
	}

	clearState() {
		this.setState({
			selectedColors: []
		})
	}

	onAddNewColor(color?) {
		const self = this;
		
		let newColor = new Color(color);
		newColor.original = new Color(newColor);
		this.props.colorScheme.addColor(newColor);

		this.onSchemeChanged();
		this.forceUpdate();
	}

	onColorChanged(color) {
		this.setState({
			hasChanges: true
		})
	}

	onColorSaved(color) {
		this.setState({
			hasChanges: false
		})

		// Set original to current change set
		color.original = new Color(color);

		this.onSchemeChanged();
		this.forceUpdate();
	}

	onDeleteColor(c) {
		this.props.colorScheme.deleteColor(c);
		this.setState({
			selectedColors: this.state.selectedColors.filter(_c => {
				return _c != c
			})
		})
	}

	onSchemeChanged() {
		//this.props.onSchemeChanged(this.props.colorScheme);
	}

	onColorSelected(color) {
		const self = this;
		
		let alreadySelected = false;
		self.state.selectedColors.forEach((c) => {
			if (c == color)
				alreadySelected = true;
		});

		if (!alreadySelected) {
			// add to selected
			self.setState({
				selectedColors: [...self.state.selectedColors, color]
			});
		} else {
			// remove from selected
			self.setState({
				selectedColors: self.state.selectedColors.filter((c) => {
					return (c != color)
				})
			});
		} 
	}

	render() {
		let self = this;

		return this.props.colorScheme ?
			(<div className={ 'container view color-scheme-designer' }>

				<div className="controls">
					<div className="button button-blue-md button-inline" onClick={() => self.onAddNewColor()}>Add Color</div>
					<div className="button button-blue-md button-inline" onClick={() => self.props.onDeleteScheme(self.props.colorScheme)}>Delete Scheme</div>
				</div>

				<div className="color-set">
					{ this.props.colorScheme.colors.map((c, i) => {
						let colorHex = c.getColor();// c.original.getColor();
						let style = { 'backgroundColor': colorHex };
						let isSelected = this.state.selectedColors.includes(c);
						return ( 
							<div className={'color' + (isSelected ? ' selected' : '')} style={style} onClick={() => self.onColorSelected(c)} key={i}>
								<div className="info">{colorHex}</div>
							</div>
						)
					})}
				</div>
				
				{ this.state.selectedColors.map((c, i) => {
					return ( <ColorPickingArea key={i} color={c} 
						onColorChanged={(c) => self.onColorChanged(c)} 
						onColorSaved={(c) => self.onColorSaved(c)}
						onAddNewColor={(c) => self.onAddNewColor(c)}
						onDeleteColor={(c) => self.onDeleteColor(c)} /> );
				})}
			</div>)
			: null;
	}

}
