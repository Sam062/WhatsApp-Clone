import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {

    const user = JSON.parse(sessionStorage.getItem("user"));

    return (
        (user && user.username) ? <Outlet /> : <Navigate to='/' />
    )
}

export default PrivateRoute