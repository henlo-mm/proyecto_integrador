import { useContext, useEffect, useState, createContext } from "react";
import { useAuth } from "./AuthContext"; 
import { readUser } from "../../db/users-collection"; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { userLogged } = useAuth(); 
    const [userData, setUserData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (userLogged) {
            const userEmail = userLogged.email; 

            setLoading(true);
            readUser(userEmail).then(result => {
                if (result.success) {
                    setUserData(result.userData);
                } else {
                    console.error("Failed to fetch user data:", result.message);
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
            setUserData(null); 
        }
    }, [userLogged]);

    return (
        <UserContext.Provider value={{ userData, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
