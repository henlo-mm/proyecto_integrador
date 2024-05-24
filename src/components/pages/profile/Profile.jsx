import {React, useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import "../../styles/profile.css";
import {useAuth} from '../../context/AuthContext';
import {createUser, readUser} from '../../../db/users-collection'

export default function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [valuesUser, setValuesUser] = useState({username: "-", email: "-"});
    const [activeLevels, setActiveLevels] = useState({level1: false, level2: false, level3: false, level4: false});
    const auth = useAuth();

    const saveDataUser = async (valuesUser) => {
        const {success, userData} = await readUser(valuesUser.email)
        if (!success) {
            await createUser(valuesUser);
            setActiveLevels(valuesUser);
        } else {
            console.log('data: ', userData)
            setActiveLevels(userData);
        }
    }

    useEffect(() => {
        if (auth.userLogged) {
            const {displayName, email} = auth.userLogged;

            saveDataUser({
                displayName: displayName,
                email: email,
                level1: true,
               // level2: false,
                level3: false,
                level4: false,
                checkPoint1: false,
                checkPoint2: false,
                checkPoint3: false,
                checkPoint4: false,
                positionLevel1: [2, 10, 48],
                positionLevel2: [0, 10, -65],
                positionLevel3: [2, 10, 48],
                positionLevel4: [2, 10, 48],
                vidas: 3,
                coleccion: 0
            })

            setValuesUser({
                    displayName: displayName, email: email, level1: true,
                   // level2: false,
                    level3: false,
                    level4: false,
                    checkPoint1: false,
                    checkPoint2: false,
                    checkPoint3: false,
                    checkPoint4: false,
                    positionLevel1: [2, 10, 48],
                    positionLevel2: [0, 10, -65],
                    positionLevel3: [2, 10, 48],
                    positionLevel4: [2, 10, 48],
                    vidas: 3,
                    coleccion: 0
                }
            );

        }
    }, [auth.userLogged])

    const onHandleButtonLogout = async () => {
        await auth.logout()
            .then((res) => navigate("/"))
            .catch((error) => console.error(error))
    }

    const navigateToLevel = (level) => {
        navigate(`/${level}`, {state: {userData: valuesUser}});
    };

    return (
        <div className="profile-container">
            <h1 className="profile-title">Perfil</h1>
            <div className="profile-info">
                <p><strong>Username:</strong> {valuesUser.displayName}</p>
                <p><strong>Email:</strong> {valuesUser.email}</p>
            </div>
            <div className="level-selection-container">
                {activeLevels.level1 &&
                    <button onClick={() => navigateToLevel("level1")} className="level-button">Nivel 1</button>}
                {activeLevels.level2 &&
                    <button onClick={() => navigateToLevel("level2")} className="level-button">Nivel 2</button>}
                {activeLevels.level3 &&
                    <button onClick={() => navigateToLevel("level3")} className="level-button">Nivel 3</button>}
                {activeLevels.level4 &&
                    <button onClick={() => navigateToLevel("level4")} className="level-button">Nivel 4</button>}
            </div>
            <div className='logout-container'>
                <button className="level-button" onClick={onHandleButtonLogout}> Logout</button>
            </div>
        </div>
    );
}
