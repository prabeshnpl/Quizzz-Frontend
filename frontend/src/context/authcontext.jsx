import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
    const navigate = useNavigate();

    const isTokenExpired = (expiryTime) => {
        return Date.now() >= expiryTime;
    };

    // if refresh token is expired, clear localStorage for login again
    // Else fetch new access token 
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        const refreshTokenExpiry = parseInt(localStorage.getItem('refresh_token_expiry'), 10);
        const accessTokenExpiry = parseInt(localStorage.getItem('access_token_expiry'), 10);

        if (isTokenExpired(refreshTokenExpiry)) {
            // Both tokens expired, log out the user
            localStorage.clear();
            navigate('/login');
            return null;
        }
        if(!isTokenExpired(accessTokenExpiry))
        {return localStorage.getItem('access_token');}

        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (response.ok) {
            const data = await response.json();
            const newAccessToken = data.access;
            const newAccessTokenExpiry = Date.now() + 5 * 60 * 1000; // Example: 5 minutes
            localStorage.setItem('access_token', newAccessToken);
            localStorage.setItem('access_token_expiry', newAccessTokenExpiry);
            setAccessToken(newAccessToken);
            return newAccessToken;
        } else {
            // Refresh token failed, log out the user
            localStorage.clear();
            navigate('/login');
            return null;
        }
    };

    const logout = () => {
        localStorage.clear();
        setAccessToken(null);
        setRefreshToken(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
