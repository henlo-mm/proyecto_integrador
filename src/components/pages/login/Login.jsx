import "../../styles/login.css";
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const navigate = useNavigate(); 

    const onHandleButtonStart = (levelRoute) => {
        console.log("Iniciar Juego");
        navigate(levelRoute);
    }

    return (
        <div className="container">
            <div className="title-dead-game">
                Bienvenido a<br/>
            </div>
            <div className="button-container">

                <button onClick={() => onHandleButtonStart('/level1')} className="button-start">Nivel 1</button>
                <button onClick={() => onHandleButtonStart('/level2')} className="button-start">Nivel 2</button>
                <button onClick={() => onHandleButtonStart('/level3')} className="button-start">Nivel 3</button>
                <button onClick={() => onHandleButtonStart('/level4')} className="button-start">Nivel 4</button>
            </div>
        </div>
    );

}