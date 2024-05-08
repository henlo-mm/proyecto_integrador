import {React, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../styles/profile.css";
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    
    const auth = useAuth();
    const [valuesUser, setValuesUser] = useState({username: "-", email: "-"});
    
    useEffect(() => {
        if(auth.userLogged){
            
            const {displayName, email} = auth.userLogged;
            setValuesUser({displayName: displayName, email: email}
            );       
            
        }
    }, [auth.userLogged])

    

    const navigateToLevel = (level) => {
        navigate(`/${level}`);
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Perfil</h1>
            <div className="profile-info">
                <p><strong>Username:</strong> {valuesUser.displayName}</p>   
                <p><strong>Email:</strong> {valuesUser.email}</p>
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
