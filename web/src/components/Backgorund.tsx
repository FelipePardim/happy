import React from 'react';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/background.css';

export default function Background() {
    return (
        <div className="background">

            <img src={mapMarkerImg} alt="happy"/>
            <strong>happy</strong>

            <h1>Paraná</h1>
            <h2>Dois Vizinhos</h2>
        </div>
    )
}