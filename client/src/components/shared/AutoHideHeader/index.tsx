import * as React from 'react';

import './style.scss';

interface IProps {
    container: HTMLElement | null;
    autoHide?: boolean;
    hideDelay?: number;
}

// how many pixels from top of window to show header if mouse is there
const MOUSE_HEADER_BUFFER_HEIGHT = 60;

// ms to wait after leaving header area before hiding
const HIDE_DELAY = 330;

const HIDE_CLASS = 'hide';

export default class AutoHideHeader extends React.Component<IProps, any> {

    // this element reference
    nav = React.createRef<HTMLDivElement>();

    isReady: boolean = false;

    isShowing: boolean = false;

    isMouseInShowArea: boolean = false;

    hideTimeout: NodeJS.Timeout | undefined = undefined;

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps, prevProps) {
        if (!nextProps.autoHide) {
            this.show();
            this.props.container!.removeEventListener('mousemove', this.onMouseMove);
        } else {
            this.props.container!.addEventListener('mousemove', this.onMouseMove);
        }
    }

    componentDidMount() {
        this.isShowing = typeof this.props.autoHide != 'undefined' ? this.props.autoHide : false;
        if (this.props.container && this.nav && this.props.autoHide) {
            this.initSlide();
        }
    }

    hide = () => {
        if (!this.isShowing) return;
        this.hideTimeout = setTimeout(() => {
            if (this.isMouseInShowArea) return;
            if (!this.nav.current!.classList.contains(HIDE_CLASS)) {
                this.nav.current!.classList.add(HIDE_CLASS);
            }
            this.isShowing = false;
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = undefined;
            }
        }, HIDE_DELAY);
    }

    show = () => {
        if (this.hideTimeout) clearTimeout(this.hideTimeout);
        if (this.isShowing) return;
        if (this.nav.current!.classList.contains(HIDE_CLASS)) {
            this.nav.current!.classList.remove(HIDE_CLASS);
        }
        this.isShowing = true;
    }

    onMouseMove = (e: any) => {
        if (!this.props.autoHide || !this.isReady) return;
        if (e.clientY < MOUSE_HEADER_BUFFER_HEIGHT) {
            this.isMouseInShowArea = true;
            this.show();
        } else {
            this.isMouseInShowArea = false;
            this.hide();
        }
    }

    initSlide() {
        const self = this;
        let c: any = this.props.container;

        c.addEventListener('mousemove', this.onMouseMove);

        // hide the header by default?
        if (this.props.autoHide && this.props.hideDelay) {
            setTimeout(() => {
                self.isReady = true;
                self.hide();
            }, this.props.hideDelay);
        } else {
            this.isReady = true;
        }
    }

    render() {
		return (
			<div ref={this.nav as any} className="auto-hide-header">
                {this.props.children}
			</div>
        );
    }

}
