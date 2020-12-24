import * as React from 'react';
import ColorEdit from 'client/components/schemes/ColorEdit';
import Color from 'lib/models/Color';

import './style';
import Scheme from 'client/lib/models/Scheme';

interface IProps {
    scheme: Scheme;
    isEditable: boolean;
    onAddColor: (color: Color) => void;
    onDeleteColor: (color: Color) => void;
}

/* Responsible for loading and displaying a Scheme (public or private) */

export default class SchemeDesigner extends React.Component<IProps, any> {

	constructor(props: any) {
		super(props);
		this.state = {
            isEditable: this.props.isEditable,
			selectedColors: [],
			hasChanges: false
		}
	}

	componentDidMount() {
        // todo: get selected colors?
		//this.loadScheme(this.props.scheme);
	}

    componentWillReceiveProps(nextProps) {
		if (nextProps.scheme != this.props.scheme) {
			this.clearState();
		}
	}

	clearState() {
		this.setState({
			selectedColors: []
		})
	}

	addNewColor = (_color?, select = false) => {
		let color = new Color(_color);
        color.original = new Color(color);

        if (select) {
            this.selectColor(color);
        }

        this.props.onAddColor(color);
		//this.forceUpdate();
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
		this.props.scheme.deleteColor(c);
		this.setState({
			selectedColors: this.state.selectedColors.filter(_c => {
				return _c != c
			})
		})
	}

	selectColor = (color) => {
		const self = this;
		
		let alreadySelected = this.state.selectedColors.find(c => c === color) != undefined;
		if (!alreadySelected) {
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
        console.log("scheme designer...", this.props.scheme)

        return this.props.scheme ?
        
			(<div id="scheme-designer" className={ 'container view' }>

				{ false && <div className="color-set">
					{ this.props.scheme.colors.map((c, i) => {
						let colorHex = c.getColor();
						let style = { 'backgroundColor': colorHex };
						let isSelected = this.state.selectedColors.includes(c);
						return ( 
							<div className={'color' + (isSelected ? ' selected' : '')} style={style} onClick={() => self.selectColor(c)} key={i}>
								<div className="info">{colorHex}</div>
							</div>
						)
					})}
                </div> 
                }
				
				{ this.props.scheme.colors.map((c, i) => {
					return ( <ColorEdit key={i} color={c} 
						onColorChanged={(c) => self.changeColor(c)} 
						onColorSaved={(c) => self.saveColor(c)}
						onAddNewColor={(c) => self.addNewColor(c)}
						onDeleteColor={(c) => self.deleteColor(c)} /> );
				})}

                { <div className="add-color" onClick={() => self.addNewColor(null, true)}>+ Add Color</div> }

			</div>)
			: null;
	}

}
