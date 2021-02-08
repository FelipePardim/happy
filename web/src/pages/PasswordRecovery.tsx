import React from "react";

// import { Link } from "react-router-dom";

import Background from "../components/Backgorund";
import Button from "../components/Button";
import TextField from "../components/TextField";

import "../styles/pages/login.css";

function PasswordRecovery() {
    return (
        <div>
            <Background></Background>
            <form className="form">
                <h1 className="PassRec">Esqueci a senha</h1>

                <h2>Sua redefinição de senha será enviada para o e-mail cadastrado.</h2>
                
                <TextField id="email" text="E-mail"></TextField>

                <Button text="Enviar" type="confirm-button"></Button>
            </form>
        </div>
    );
}

export default PasswordRecovery;
