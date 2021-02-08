import React from "react";

import "../styles/components/TextFields.css";

export default function TextField(props: any) {
    const text = props.text;
    const id = props.id;
    return (
        <div className="input-block">
            <label htmlFor={id}>{text}</label>
            <input id={id} />
        </div>
    );
}
