import React from 'react';
import '../styles/instructions.css';

const ControlsCard = ({ movements }) => {
    return (
        <div className="instructions-card">
            <h2>Controles del Juego</h2>
            <ul>
                {movements.map((move) => (
                    <li key={move.name}>
                        <strong>{translateAction(move.name)}:</strong> {move.teclas}
                    </li>
                ))}
                <li key="shooting">
                    <strong>{translateAction("shooting")}:</strong> Click izquierdo
                </li>
            </ul>
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

export default ControlsCard;
