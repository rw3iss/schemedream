import * as React from 'react';
import './style';

const DEFAULT_LABEL_POSITION = 'left';

interface IProps {
    label: string;
    labelPosition: 'top' | 'left' | 'right';

    items: []
    selectedItem: any;

    onChange: () => void;
}

export default class CustomDropdown extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const labelPosition = this.props.labelPosition || DEFAULT_LABEL_POSITION;

        return (
            <div className={ 'custom-dropdown' + (this.props.label && ` label-${labelPosition}`)}>

                { this.props.label && 
                    <span className="label">{this.props.label}</span> 
                }

                <select className="input-sm" onChange={this.props.onChange} value={this.props.selectedItem}>
                    { false && <option value="-" key="-">--</option> }
                    { this.props.items.map((i, idx) => {
                        return (<option value={i.value} key={idx}>{i.label}</option>);
                    }) }
                </select>

            </div>
        );
    }

}
