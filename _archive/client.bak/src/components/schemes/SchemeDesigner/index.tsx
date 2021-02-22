import * as React from 'react';
import ColorPickingArea from 'components/schemes/ColorPickingArea';
import { Color } from 'lib/models/Colors';

import './style.scss';
import ColorScheme from 'client/lib/models/ColorScheme';

interface IProps {
	colorScheme: ColorScheme;
	onDeleteScheme: (ColorScheme) => void;
}

export default class ColorSchemeDesigner extends React.Component<IProps, any> {

	constructor(props: any) {
		super(props);
		this.state = {
			colorScheme: this.props.colorScheme,
			selectedColors: [],
			hasChanges: false
		}
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

	addNewColor = (color?, select = false) => {
		let newColor = new Color(color);
		newColor.original = new Color(newColor);
        this.props.colorScheme.addColor(newColor);

        if (select) {
            this.selectColor(newColor)
        }

		this.forceUpdate();
	}

	changeColor = (color) => {
		this.setState({
			hasChanges: true
		})
	}

	saveColor = (color) => {
		this.setState({
			hasChanges: false
		})

		// Set original to current change set
		color.original = new Color(color);

		//this.onSchemeChanged();
		this.forceUpdate();
	}

	deleteColor = (c) => {
		this.props.colorScheme.deleteColor(c);
		this.setState({
			selectedColors: this.state.selectedColors.filter(_c => {
				return _c != c
			})
		})
	}

	selectColor = (color) => {
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
					<div className="button button-red-sm button-inline" onClick={() => self.props.onDeleteScheme(self.props.colorScheme)}>X Delete Scheme</div>
				</div>

				<div className="color-set">
					{ this.props.colorScheme.colors.map((c, i) => {
						let colorHex = c.getColor();
						let style = { 'backgroundColor': colorHex };
						let isSelected = this.state.selectedColors.includes(c);
						return ( 
							<div className={'color' + (isSelected ? ' selected' : '')} style={style} onClick={() => self.selectColor(c)} key={i}>
								<div className="info">{colorHex}</div>
							</div>
						)
					})}
            
                    { <div className="button button-blue-sm button-inline add-color" onClick={() => self.addNewColor(null, true)}>+ Add Color</div> }

				</div>
				
				{ this.state.selectedColors.map((c, i) => {
					return ( <ColorPickingArea key={i} color={c} 
						onColorChanged={(c) => self.changeColor(c)} 
						onColorSaved={(c) => self.saveColor(c)}
						onAddNewColor={(c) => self.addNewColor(c)}
						onDeleteColor={(c) => self.deleteColor(c)} /> );
				})}
                    

			</div>)
			: null;
	}

}
