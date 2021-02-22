import * as React from 'react';
import Scheme from 'lib/models/Scheme';
import Color from 'lib/models/Color';
import Icon from 'components/shared/Icon';

import './style.scss';

interface IProps {
    scheme: Scheme;
    onAddColor: (c: Color) => void;
    onDeleteColor: (c: Color) => void;
    onColorSelected: () => void;
    onShowAllColors: () => void;
    onHideAllColors: () => void;
}

export default class SwatchSelect extends React.Component<IProps, any> {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    expand = () => {
        console.log("expand")
        this.setState({ expanded: true });
    }

    close = () => {
        console.log("close")
        this.setState({ expanded: false });
    }

	addNewColor = (_color?, select = false) => {
		let color = new Color(_color);
        color.original = new Color(color);
        this.props.scheme.addColor(color);
        this.props.onAddColor(color);
		this.forceUpdate();
	}

    render() {
        const self = this;
        return (
            <div className="swatch-select">

                <div className="index">
                    <div className="left">&lt;</div>
                    <div className="swatches">
                        { this.props.scheme.colors.slice(0, 5).map((c, idx) => {
                            return (<div key={idx} className="swatch">color</div>);
                        })}
                    </div>
                    <div className="right">&gt;</div>
                    <div className="action add">
                        <div className="action create-scheme" onClick={this.addNewColor}>
                            <Icon src="/static/img/icons/add.svg" clickable={true} />
                        </div>
                    </div>
                    <div className="action expand" onClick={this.expand}>
                        <Icon src="/static/img/icons/arrow_down.svg" clickable={true} />
                    </div>
                </div>

                <div className={ 'dropdown-full' + (this.state.expanded ? ' expanded' : '') }>
                    <div className="left">&lt;</div>
                    <div className="swatches">
                        { this.props.scheme.colors.map((c, idx) => {
                            return (<div key={idx} className="swatch">color</div>);
                        })}
                    </div>
                    <div className="right">&gt;</div>
                    <div className="action close" onClick={this.close}>
                        <Icon src="/static/img/icons/arrow_down.svg" clickable={true} />
                    </div>

                </div>

            </div>
        );

    }

}
