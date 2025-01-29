import { useEffect, useState, useCallback } from "react";
import IUser from "../types/User";

const GetUserData = () => {
    const [userData, setUserData] = useState<IUser>();
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchUserData = useCallback(async () => {
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
                    bots: data.bots.map((bot: { botName: string; botKey: string }) => ({
                        botName: bot.botName,
                        botKey: bot.botKey
                    }))
                };                    

                setUserData(_userData);
            }
        } catch (error) {
            console.error('Error getting user data:', error);
        }
    }, []);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData, refreshTrigger]);

    return {
        userData,
        refreshUserData: () => setRefreshTrigger(prev => prev + 1)
    };
}

export default GetUserData;