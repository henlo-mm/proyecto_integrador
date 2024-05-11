import "../../styles/login.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

export default function Login() {

    const navigate = useNavigate(); 
    const auth = useAuth();

    const onHandleButtonLogin = async () => {
        await auth.loginWithGoogle()
        .then((res)=>navigate('/profile'))
        .catch((error)=>console.error(error))
       
    }

    return (
        <div className="login-container">
            <div className="title-dead-game">
                DevPool y Codeverine: En Busca de la Regeneración Perdida
            </div>
                <h1 className="login-title">Haz clic en el siguiente botón para iniciar sesión</h1>
                <div onClick={onHandleButtonLogin}>
                     <button  className="login-button">INGRESAR</button>
                </div>
        </div>
    );
}