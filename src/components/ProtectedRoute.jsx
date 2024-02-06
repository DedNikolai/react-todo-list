import React, { useContext } from "react";
import {Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";

function ProtectedRoute({children}) {
    const {user, userLoading} = useSelector(state => state.user);

    if (!user) return <Navigate to='/login' />

    return (
        children
    )
}

export default ProtectedRoute;