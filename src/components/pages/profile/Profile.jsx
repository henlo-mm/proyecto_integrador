import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../styles/profile.css";

export default function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state;

    const navigateToLevel = (level) => {
        navigate(`/${level}`);
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Perfil</h1>
            <div className="profile-info">
                <p><strong>Username:</strong> {user.username}</p>
            </div>
            <div className="level-selection-container">
                <button onClick={() => navigateToLevel("level1")} className="level-button">Nivel 1</button>
                <button onClick={() => navigateToLevel("level2")} className="level-button">Nivel 2</button>
                <button onClick={() => navigateToLevel("level3")} className="level-button">Nivel 3</button>
                <button onClick={() => navigateToLevel("level4")} className="level-button">Nivel 4</button>
            </div>
        </div>
    );
}
