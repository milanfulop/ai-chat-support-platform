import { useState } from 'react';

import checkAuthentication from '../../utils/checkAuthentication';
import GetUserData from '../../utils/getUserData';
import createNewBot from '../../utils/createNewBot';

import ApiSettings from './botSettings';

const Dashboard = () => {
    //if this is true, the rest of the dashboard will disappear
    const [isEditingApiSettings, setEditingApiSettings] = useState<boolean>(false);
    const [editingApiKey, setEditingApiKey] = useState<string>("");

    const isAuthenticated = checkAuthentication(true);
    const userData = GetUserData();

    if (!isEditingApiSettings) {
        return (
            <div>
                <h1>dahsboard {isAuthenticated ? "authed" : "unauthed"}</h1>
                <button onClick={createNewBot}>xd</button>

                {userData ? (
                    <div>
                        <ul>
                            {userData.bots.map((data, index) => (
                                <li key={index}>
                                    <p onClick={() => {
                                        setEditingApiSettings(true);
                                        setEditingApiKey(data)
                                    }}>{data}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        );
    }
    else {
        return (
            <ApiSettings botKey={editingApiKey} />
        )
    }
};

export default Dashboard;
