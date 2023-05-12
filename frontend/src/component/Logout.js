import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import Cookies from 'js-cookie';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        const cookieExists = Cookies.get('jwt') !== undefined;
        if(cookieExists){
            Cookies.remove('jwt');
        }
    }

    const handleClick = async (event) => {
        event.preventDefault();
        handleLogout();
        navigate('/login');
        window.location.reload();
    }
  
    return (
        <div className="login-page">
        <h1 className="login-title">Log Out</h1>
        <button className="login-button" type="submit" onClick={handleClick}>Log Out</button>
        </div>
    );
}

export default Logout;
