import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"; 

function PrivateRoute({ children }) {
    const { userLogged } = useAuth(); 

    return userLogged ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;
