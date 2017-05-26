import React from 'react';
import './icon.less';

export default (props) => {
    const fontSize = props.size || 14;

    return (
        <span
            className={`demo-icon the-icons size-${props.size} icon-${props.type}`}
            style={{fontSize}}>
        </span>
    )
}
