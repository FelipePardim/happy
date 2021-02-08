import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../images/logo.svg';

function CreateUser() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" />

        <div className="location">
          <strong>Dois Vizinhos</strong>
          <span>Paraná</span>
        </div>

        <main>
          <h1>Login</h1>
        </main>

        <Link to="/" className="access">
          Acessar
        </Link>

        <Link to="/app" className="enter-app">
        </Link>
      </div>
    </div>
  )
}

export default CreateUser;