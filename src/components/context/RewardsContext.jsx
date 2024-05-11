import React, { createContext, useState, useContext, useEffect } from "react";
import { useLives } from "./LivesContext";  
import { useUser } from "./UserContext";  

const RewardsContext = createContext();

export const useRewards = () => useContext(RewardsContext);

export const RewardsProvider = ({ children }) => {
    const [collectedRewards, setCollectedRewards] = useState(0);
    const [healthCount, setHealthCount] = useState(0);  

    const { userData, isLoading } = useUser();
    const { gainLife } = useLives(); 
   
    useEffect(() => {
        if (!isLoading && userData && userData.coleccion !== undefined) {
            setHealthCount(userData.coleccion);
        }
    }, [userData, isLoading]);  

    const increaseHealthCount = () => {
        setHealthCount(prev => {
            const newCount = prev + 1;
            setCollectedRewards(newCount);
            if (newCount >= 4) {
                gainLife();
                return 0;  
            }
            return newCount;
        });


    };


    const resetHealthCount = () => {
        setHealthCount(0);
    };

    return (
        <RewardsContext.Provider value={{
            collectedRewards,
            healthCount,
            increaseHealthCount,
            resetHealthCount
        }}>
            {children}
        </RewardsContext.Provider>
    );
};
