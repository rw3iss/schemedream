import * as React from 'react';

export default function(props) {
    return <div className={'icon' + (props.clickable ? ' clickable' : '')}><img src={props.src}/></div>;
}