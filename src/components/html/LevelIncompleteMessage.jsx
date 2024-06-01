import React from 'react';
import '../styles/levelComplete.css';

export function LevelIncompleteMessage({ onClose }) {
    return (
        <div className="level-incomplete-message">
            <div className="message-content">
                <h2>Nivel incompleto</h2>
                <p>Necesitas recoger al menos 4 vidas. ¡Sigue explorando y consigue las recompensas!</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
}
