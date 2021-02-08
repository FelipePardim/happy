import React from 'react';

import '../styles/components/button.css';

export default function Button(props: any) {
    const text = props.text;
    const type = props.type;

    return (
        <button className={type} type="submit">
            {text}
        </button>
    )
}