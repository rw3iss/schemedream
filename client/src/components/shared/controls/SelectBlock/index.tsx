import * as React from 'react';
import './style.scss';

interface IProps {
    label: string;
    items: []
    selectedItem: any;
    onChange: () => void;
}

export default class SelectBlock extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="select-block">
                <span className="label">{this.props.label}</span>
                <select className="input-sm" onChange={this.props.onChange} value={this.props.selectedItem}>
                    { false && <option value="-" key="-">--</option> }
                    { this.props.items.map(i => {
                        return (<option value={i} key={i}>{i}</option>);
                    }) }
                </select>
            </div>
        );
    }

}
