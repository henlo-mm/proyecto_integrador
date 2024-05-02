// components/LoadingScreen.js
import React from 'react';
import '../styles/loadingScreen.css';
import useMovements from '../utils/key-movements';  

const LoadingScreen = () => {
    const movements = useMovements();

    return (
        <div className="loading-screen">
            <div className="loading-container">
                <h1>Preparando tu experiencia...</h1>
                <div className="instructions-panel">
                    <h2>Controles del Juego</h2>
                    <ul>
                        {movements.map((move) => (
                            <li key={move.name}>
                                <strong>{translateAction(move.name)}:</strong> {move.keys.join(' o ')}
                            </li>
                        ))}
                        <li key="shooting">
                            <strong>{translateAction("shooting")}:</strong> Click izquierdo
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function translateAction(action) {
    const translations = {
        forward: "Avanzar",
        backward: "Retroceder",
        leftward: "Mover a la izquierda",
        rightward: "Mover a la derecha",
        jump: "Saltar",
        exit: "Salir",
        run: "Correr",
        attack: "Atacar",
        shooting: "Disparar"
    };
    return translations[action] || action;
}

export default LoadingScreen;