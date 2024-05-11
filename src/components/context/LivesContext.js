import React, { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./UserContext";  

const LivesContext = createContext();

export const useLives = () => useContext(LivesContext);

export const LivesProvider = ({ children }) => {
    const [collectedLives, setCollectedLives] = useState(() => {
        const savedLives = localStorage.getItem('collectedLives');
        return savedLives ? JSON.parse(savedLives) : 0;
    });

    const { userData, isLoading } = useUser();

    useEffect(() => {
        if (!isLoading && userData && userData.vidas !== undefined) {
            setCollectedLives(userData.vidas);
        }
    }, [userData, isLoading]);  

    useEffect(() => {
        localStorage.setItem('collectedLives', JSON.stringify(collectedLives));
    }, [collectedLives]);

    const loseLife = () => {
        setCollectedLives(prev => Math.max(0, prev - 1));
    };

    const gainLife = (amount = 1) => {
        setCollectedLives(prev => prev + amount);
    };

    return (
        <LivesContext.Provider value={{ collectedLives, loseLife, gainLife }}>
            {children}
        </LivesContext.Provider>
    );
};
