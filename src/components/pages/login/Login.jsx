import { useState } from "react";
import "../../styles/login.css";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = (event) => {
      event.preventDefault();
      navigate('/profile', { state: { username: username } })
    };


    return (
  
        <div className="login-container">
            <div className="title-dead-game">
                DevPool y Codeverine: En Busca de la Regeneración Perdida
            </div>
            <form onSubmit={handleSubmit} className="login-form">
                <h1 className="login-title">INICIAR SESIÓN</h1>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button type="submit" className="login-button">ENVIAR</button>
            </form>
        </div>
    );

}