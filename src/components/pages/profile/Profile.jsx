import {React, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../../styles/profile.css";
import { useAuth } from '../../context/AuthContext';
import { createUser, readUser } from '../../../db/users-collection'

export default function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [valuesUser, setValuesUser] = useState({username: "-", email: "-"});
    const auth = useAuth();
    
    const saveDataUser = async (valuesUser) => {
        const {success} = await readUser(valuesUser.email)
        if (!success)
            await createUser(valuesUser)
    }

    useEffect(() => {
        if(auth.userLogged){
            const {displayName, email} = auth.userLogged;
            
            saveDataUser({
                displayName: displayName,
                email: email,
            })
            setValuesUser({displayName: displayName, email: email}
            );         
            
        }
    }, [auth.userLogged])

    const onHandleButtonLogout = async () => {
        await auth.logout()
            .then((res) => navigate("/"))
            .catch((error) => console.error(error))
    }
    
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
            <div className='logout-container'>
                 <button className="level-button" onClick={onHandleButtonLogout}> Logout </button>
            </div>
        </div>
    );
}
