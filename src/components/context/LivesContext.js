import React, { createContext, useState, useContext } from "react";

const LivesContext = createContext();

export const useLives = () => useContext(LivesContext);

export const LivesProvider = ({ children }) => {
    const [collectedLives, setCollectedLives] = useState(3);

    const loseLife = () => {
        setCollectedLives(prev => Math.max(0, prev - 1));
    };

    const gainLife = (amount = 1) => {
        console.log("Gain life", amount);
        setCollectedLives(prev => prev + amount);
    };

    return (
        <LivesContext.Provider value={{ collectedLives, loseLife, gainLife }}>
            {children}
        </LivesContext.Provider>
    );
};
