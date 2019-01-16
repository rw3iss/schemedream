import * as React from 'react';

import './style.scss';

const DEFAULT_MAX_HEIGHT = 40;

let mounted = false;
// Fades mounted component up after X seconds
export default class FadeUpOutEffect extends React.Component<any, any> {

	constructor(props) {
        super(props);
        this.state = {
            mounted: false,
            loaded: false, //props.loaded || false,
            height: props.height
        }

        if (typeof this.props.duration == 'undefined') {
            throw new Error("FadeUpOutEffect component requires a duration property.");
        } else {
            try {
                let d = parseInt(this.props.duration);
                this.state.duration = d;

                let h = parseInt(this.props.height);
                this.state.height = h;
            } catch(e) {
                throw new Error("FadeUpOutEffect properties must be integers.");
            }
        }
	}

	componentDidMount() {
        const self = this;
        mounted = true;

        window.setTimeout(() => {
            if (mounted) {
                self.setState({
                    loaded: true
                });

                // Do another timeout to fire callback only after full animation time
                window.setTimeout(() => {
                    if (self.props.onComplete) {
                        self.props.onComplete();
                    }
                }, 500);
            }
        }, self.state.duration);
    }

    componentWillUnmount() {
        mounted = false;
    }

	render() {
        let style = {
            maxHeight: this.state.height || DEFAULT_MAX_HEIGHT
        }

		return (
			<div className={ 'fade-up-out-effect' + (this.state.loaded ? ' loaded' : '') } style={style}>
				{this.props.children}
			</div>
		);
	}
	
}
