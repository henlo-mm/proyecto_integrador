import React from 'react';
import '../styles/levelComplete.css';

export function LevelIncompleteMessage({ onClose }) {
    return (
        <div className="level-incomplete-message">
            <div className="message-content">
                <h2>Level Incomplete</h2>
                <p>You need to collect at least 6 healths to complete this level. Keep exploring and collecting healths!</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}
