import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { accessToken } = useAuth();
        const navigate = useNavigate();

        useEffect(() => {
            if (!accessToken) {
                navigate('/login');
            }
        }, [accessToken, navigate]);

        if (!accessToken) {
            return null; // Render nothing while redirecting
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
