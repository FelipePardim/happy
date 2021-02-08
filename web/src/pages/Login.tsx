import React from "react";

import { Link } from "react-router-dom";

import Background from "../components/Backgorund";
import Button from "../components/Button";
import TextField from "../components/TextField";

import "../styles/pages/login.css";

function Login() {
    return (
        <div>
            <Background></Background>
            <form className="form">
                <h1>Fazer Login</h1>

                <TextField id="email" text="E-mail"></TextField>
                <TextField id="password" text="Senha"></TextField>

                <div className="checkbox">
                    <label htmlFor="checkbox" id="checkbox">
                    <input type="checkbox" />
                        Lembrar-me
                    </label>

                    <Link to="/passwordRecovery">Esqueci minha senha</Link>
                </div>

                <Button text="Entrar" type="confirm-button"></Button>
            </form>
        </div>
    );
}

export default Login;
