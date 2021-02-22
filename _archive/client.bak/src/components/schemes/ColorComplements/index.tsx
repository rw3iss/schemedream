import * as React from 'react';
import EventBus from 'eventbusjs';
import { Color } from 'lib/models/Colors';

import './style.scss';

let mounted = true;
export default class ColorComplements extends React.Component<any, any> {

	constructor(props: any) {
		super(props);
        const self = this;

		this.state = {
            originalColor: this.props.color || null,
            numColors: 3,
            complementDegree: 0, //  0 = auto-calculate from (360/#colors)
			colors: [], // all colors in scheme
        }
	}

	componentDidMount() {
        this.calculateComplements();
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            originalColor: nextProps.previewColor
        })

        this.calculateComplements();
    }

	onNumColorsChanged(e) {
        const self = this;
        this.setState({
            numColors: e.target.value
        });

        window.setTimeout(() => {
            self.calculateComplements();
        }, 0)
    }

	onComplementDegreeChanged(e) {
        const self = this;
        this.setState({
            complementDegree: e.target.value
        });

        window.setTimeout(() => {
            self.calculateComplements();
        }, 0)
    }

    calculateComplements() {
        if (this.state.originalColor) {
            let currentHue = this.state.originalColor.hue;
            let colors: Array<Color> = [];
            for (let i=0; i<this.state.numColors; i++) {
                let color = new Color(this.state.originalColor);
                color.setHue(currentHue);
                let angleAdd = this.state.complementDegree ? this.state.complementDegree : (360 / this.state.numColors);
                currentHue = (parseInt(currentHue) + parseInt(angleAdd)) % 360;
                colors.push(color);
            }

            this.setState({
                colors: colors
            })
        }
    }

    onAddComplement(color) {
        this.props.onAddColor(color);
    }

    render() {
		let self = this;

		return (
			<div className="color-complements">
                
                <div className="controls">
                    <div className="ctrl">
                        <label className="color-count">Qty:</label>
                        <input type="number" className="input-sm" min="1" max="36" onChange={(e) => self.onNumColorsChanged(e)} value={this.state.numColors} />
                    </div>
                    <div className="ctrl">
                        <label className="color-count">Angle:</label>
                        <input type="number" className="input-sm" min="1" max="360" onChange={(e) => self.onComplementDegreeChanged(e)} value={this.state.complementDegree} />
                    </div>
                </div>

                <div className="colors">
                    {this.state.colors.map((c,i) => {
                        let style = { "backgroundColor": c.getColor() };
                        return (
                            <div className="color" style={style} key={i}>
                                <div className="hex">{c.getColor()}</div>
                                <div className="controls">
                                    <div className="button button-green-sm button-inline" onClick={() => this.onAddComplement(c)}>Add</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                
    		</div>
		);
	}

}
