import React, { useState } from 'react';
import '../styles/gameover.css'; 

export function GameOverScreen({ onRestart, onContinue }) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="gameover-container">
            <div className="gameover-message">
                <h1>Game Over</h1>
                <p>¿Qué te gustaría hacer?</p>
                <button onClick={onContinue}>Continuar desde último checkpoint</button>
                <button onClick={onRestart}>Reiniciar Nivel</button>
            </div>
        </div>
    );
}
