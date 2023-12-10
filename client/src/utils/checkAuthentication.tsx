import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckAuthentication = (redirect: Boolean) => {
    const [authenticated, setAuthenticated] = useState<Boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/check-auth', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setAuthenticated(data.isAuthenticated);
                    if (!data.isAuthenticated && redirect)
                        navigate('/login');
                } else {
                    setAuthenticated(false);

                    if (redirect)
                        navigate('/login');
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setAuthenticated(false);

                if (redirect)
                    navigate('/login');
            }
        };

        checkAuthentication();
    }, [navigate, redirect]);

    return authenticated;
};

export default CheckAuthentication;
