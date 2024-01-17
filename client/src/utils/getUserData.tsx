import { useEffect, useState } from "react";
import IUser from "../types/User";
const GetUserData = () => {
    const [userData, setUserData] = useState<IUser>();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/get-user-data', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    const _userData: IUser = {
                        id: data._id,
                        email: data.email,
                        bots: data.bots
                    }

                    setUserData(_userData);
                }
            } catch (error) {
                console.error('Error getting user data:', error);
            }
        };

        getUserData();
    }, []);

    return userData;
}

export default GetUserData;