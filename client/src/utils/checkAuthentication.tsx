import { useEffect, useState } from 'react';

const CheckAuthentication = () => {
    const [authenticated, setAuthenticated] = useState<Boolean>(false);

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
                } else {
                    setAuthenticated(false);
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setAuthenticated(false);
            }
        };

        checkAuthentication();
    }, []);

    return authenticated;
};

export default CheckAuthentication;
