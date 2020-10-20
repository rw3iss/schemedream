import * as React from 'react';
import { Color } from 'client/lib/models/Colors';
import ColorComplements from 'components/schemes/ColorComplements';
import EditableLabel from 'components/shared/EditableLabel';

import './style.scss';

let mounted = false;
export default class ColorPickingArea extends React.Component<any, any> {
    node: HTMLDivElement | null;
    pickingArea: HTMLDivElement | null;
    colorPicker: HTMLDivElement | null;
    previewColor: HTMLDivElement | null;
    hueArea: HTMLDivElement | null;
    huePicker: HTMLDivElement | null;

	constructor(props) {
		super(props);

		this.state = {
            color: this.props.color || null,
            previewColor: this.props.color || null,
            hue: null,

            pickerMode: 'HSV',
            topic: null,
            pickers: [],
            subscribers: [],
            errors: [],

            showComplements: false,
            optionsPinned: false
        }
    }

    componentDidMount() {
        mounted = true;

        this.setup();

        if (this.pickingArea) {
            this.setMouseTracking(this.pickingArea, this.updateColor.bind(this));
        }

        if (this.hueArea && this.huePicker) {
            this.setMouseTracking(this.hueArea, this.updateHueSlider.bind(this));
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.color != nextProps.color) {
            this.initNewColor(nextProps.color);
        }
    }

    onShowComplements() {
        this.setState({
            showComplements: !this.state.showComplements
        })
    }

    onRevertColor(color) {
        color.copy(color.original);
        this.setState({
            color: color
        });
        this.props.onColorChanged(this.state.color);
        //this.updatePreviewColor();
    }

    onToggleOptionsPin() {
        this.setState({
            optionsPinned: !this.state.optionsPinned
        })
    }

    onColorChanged(value) {
        this.setHex(value);
    }

    initNewColor(color) {
        const self = this;

        this.setState({
            color: color
        })

        window.setTimeout(() => {
            self.setup();
            self.forceUpdate();
        },0);
    }

    setup() {
        const self = this;

        if (this.node) {
            var type = this.node.getAttribute('data-mode');
            var topic = this.node.getAttribute('data-topic');

            this.setState({
                color: this.state.color ? this.state.color : new Color(),
                subscribers: [],
                topic: topic,
                pickerMode: (type === 'HSL') ? 'HSL' : 'HSV'
            })
            
            window.setTimeout(() => {
                self.state.color.setFormat(this.state.pickerMode);
                self.setColor(this.state.color);
                self.state.pickers[this.state.topic] = this;
                self.forceUpdate();
            },0);

         /*    this.createPickingArea();
            this.createHueArea(); */

           /*  this.newInputComponent('H', 'hue', this.inputChangeHue.bind(this));
            this.newInputComponent('S', 'saturation', this.inputChangeSaturation.bind(this));
            this.newInputComponent('V', 'value', this.inputChangeValue.bind(this));
            this.newInputComponent('L', 'lightness', this.inputChangeLightness.bind(this)); */

            // this.createAlphaArea();

            // this.newInputComponent('R', 'red', this.inputChangeRed.bind(this));
            // this.newInputComponent('G', 'green', this.inputChangeGreen.bind(this));
            // this.newInputComponent('B', 'blue', this.inputChangeBlue.bind(this));

         /*    this.createPreviewBox();
            this.createChangeModeButton(); */
/* 
            this.newInputComponent('alpha', 'alpha', this.inputChangeAlpha.bind(this));
            this.newInputComponent('hexa', 'hexa', this.inputChangeHexa.bind(this)); */

        }
    }

    setColor(color) {
		if(color instanceof Color !== true) {
			return;
		}

		if (color.format !== this.state.pickerMode) {
			color.setFormat(this.state.pickerMode);
			color.updateHSX();
        }
        
		this.state.color.copy(color);
		this.updateHuePicker();
		this.updatePickerPosition();
		this.updatePickerBackground();
		//this.updateAlphaPicker();
		this.updateAlphaGradient();
		this.updatePreviewColor();

	/* 	this.notify('red', this.color.r);
		this.notify('green', this.color.g);
		this.notify('blue', this.color.b);

		this.notify('hue', this.color.hue);
		this.notify('saturation', this.color.saturation);
		this.notify('value', this.color.value);
		this.notify('lightness', this.color.lightness);

		this.notify('alpha', this.color.a);
		this.notify('hexa', this.color.getHexa());
        notify(this.topic, this.color); */
        
        //this.props.onColorChanged(this.state.color);
	};
    
    setHex(hex) {
        let color = new Color();
        color.setHexa(hex);
        this.setColor(color);
    }

    setHue(value) {
		this.state.color.setHue(value);

        /*
        var nc = new Color(this.state.color);
        this.state.color.setHSV(value, 100, 100);
        this.state.color.setHexa(this.state.color.getHexa());
        this.forceUpdate();
        */

		this.updatePickerBackground();
		this.updateAlphaGradient();
		this.updatePreviewColor();

		/* this.notify('red', this.color.r);
		this.notify('green', this.color.g);
		this.notify('blue', this.color.b);
		this.notify('hexa', this.color.getHexa());
		this.notify('hue', this.color.hue);

		notify(this.topic, this.color); */
	};
    
    setMouseTracking(elem: HTMLDivElement, callback: any) {
        elem.addEventListener('mousedown', function(e) {
            callback(e);
            document.addEventListener('mousemove', callback);
        });

        document.addEventListener('mouseup', function(e) {
            document.removeEventListener('mousemove', callback);
        });
    }
    
    updatePickerPosition() {
        if (this.pickingArea && this.colorPicker) {
            var sizeX = this.pickingArea.clientWidth;
            var sizeY = this.pickingArea.clientHeight;
            console.log("picker area", sizeX, sizeY)
            var value = 0;
            var offset = 5;

            if (this.state.pickerMode === 'HSV')
                value = this.state.color.value;
            if (this.state.pickerMode === 'HSL')
                value = this.state.color.lightness;

            var x = (this.state.color.saturation * sizeX / 100) | 0;
            var y = sizeY - (value * sizeY / 100) | 0;

            this.colorPicker.style.left = x - offset + 'px';
            this.colorPicker.style.top = y - offset + 'px';
        }
    }	
    
    updatePickerBackground() {
        if (this.pickingArea) {
            var nc = new Color(this.state.color);
            nc.setHSV(nc.hue, 100, 100);
            nc.setHexa(nc.getHexa());
            this.pickingArea.style.backgroundColor = nc.getHexa();
        }
    }

    updateAlphaGradient() {
        //this.state.alphaMask.style.backgroundColor = this.state.color.getHexa();
        //this.forceUpdate();
    }

    updatePreviewColor() {
        if (this.previewColor) {
            this.previewColor.style.backgroundColor = this.state.color.getColor();
            this.setState({
                previewColor: this.state.color
            })
        }
    }

    updateColor(e) {
        if (this.pickingArea && this.colorPicker) {
            var x = e.pageX - this.pickingArea.offsetLeft;
            var y = e.pageY - this.pickingArea.offsetTop - 40;
            var picker_offset = 5;

            // width and height should be the same
            var sizeX = this.pickingArea.clientWidth;
            var sizeY = this.pickingArea.clientHeight;

            if (x > sizeX) x = sizeX;
            if (y > sizeY) y = sizeY;
            if (x < 0) x = 0;
            if (y < 0) y = 0;

            var value = 100 - (y * 100 / sizeY) | 0;
            var saturation = x * 100 / sizeX | 0;

            if (this.state.pickerMode === 'HSV')
                this.state.color.setHSV(this.state.color.hue, saturation, value);
            if (this.state.pickerMode === 'HSL')
                this.state.color.setHSL(this.state.color.hue, saturation, value);

            this.colorPicker.style.left = x - picker_offset + 'px';
            this.colorPicker.style.top = y - picker_offset + 'px';

            this.updateAlphaGradient();
            this.updatePreviewColor();

            this.forceUpdate();

            this.props.onColorChanged(this.state.color);

            /*
            this.notify('value', value);
            this.notify('lightness', value);
            this.notify('saturation', saturation);

            this.notify('red', this.color.r);
            this.notify('green', this.color.g);
            this.notify('blue', this.color.b);
            this.notify('hexa', this.color.getHexa());

            notify(this.topic, this.color); 
            */
        };
    }
    
    updateHueSlider(e) {
        if (this.hueArea) {
            var x = e.pageX - this.hueArea.offsetLeft;
            var width = this.hueArea.clientWidth;

            if (x < 0) x = 0;
            if (x > width) x = width;

            // TODO 360 => 359
            var hue = ((359 * x) / width) | 0;
            // if (hue === 360) hue = 359;

            this.updateSliderPosition(this.huePicker, x);
            this.setHue(hue);
            //this.forceUpdate();

            this.props.onColorChanged(this.state.color);
        }
    }
    
    updateHuePicker() {
        if (this.hueArea && this.huePicker) {
            var size = this.hueArea.clientWidth;
            var offset = 1;
            var pos = (this.state.color.hue * size / 360 ) | 0;
            this.huePicker.style.left = pos - offset + 'px';
        }
    }
    
    updateSliderPosition(elem, pos) {
		elem.style.left = Math.max(pos - 3, -2) + 'px';
	}
    
    componentWillUnmount() {
        mounted = false;
    }
    
	render() {
        const self = this;

        let colorHex = this.state.color ? this.state.color.getColor() : '';

		return (
            <div className="ui-color-picker" ref={(el) => this.node = el}>

                <div className="flex-col">
                    <div className="row flex-col">

                        <div className="preview">
                            <div className="preview-color" ref={(el) => this.previewColor = el}>
                            </div>

                            <div className={ 'overlay' + (this.state.optionsPinned ? ' pinned' : '') }>
                                <div className="pin button button-blue-sm" onClick={() => self.onToggleOptionsPin()}><i className="fa fa-thumb-tack" aria-hidden="true"></i></div>
                                <div className="options">
                                    <div className="info">
                                        <div className="hex"><EditableLabel value={colorHex} onValueChanged={(v) => self.onColorChanged(v)} /></div>
                                    </div>
                                    <div className="controls">
                                        <div className="button button-blue-sm" onClick={() => self.onShowComplements()}>Complements</div>
                                        <div className="button button-green-sm button-inline" onClick={() => self.props.onAddNewColor(this.state.color)}>Clone</div>
                                        <div className="button button-orange-sm button-inline" onClick={() => self.onRevertColor(this.state.color)}>Revert</div>
                                        <div className="button button-red-sm" onClick={() => self.props.onDeleteColor(this.state.color)}>Delete</div>
                                    </div>
                                </div>

                                { this.state.showComplements &&
                                    <ColorComplements color={this.state.color} previewColor={this.state.previewColor} onAddColor={(c) => self.props.onAddNewColor(c)} />
                                }
                            </div>
                            
                        </div>

                        <div className="flex-col">
                            <div className="row">
                                <div className="hue" ref={(el) => this.hueArea = el}>
                                    <div className="slider-picker" ref={(el) => this.huePicker = el}></div>
                                </div>
                            </div>
                            <div className="picking-area" ref={(el) => this.pickingArea = el}>
                                <div className="picker" ref={(el) => this.colorPicker = el}></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
	}
	
}
