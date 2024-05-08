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

    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   navigate('/profile', { state: { username: username } })
    // };


    return (
  
        <div className="login-container">
            <div className="title-dead-game">
                DevPool y Codeverine: En Busca de la Regeneración Perdida
            </div>
            
                <h1 className="login-title">INICIAR SESIÓN</h1>
                
                <div onClick={onHandleButtonLogin} >
                     <button  className="login-button">Login</button>
                 </div>

          
        </div>
    );

}