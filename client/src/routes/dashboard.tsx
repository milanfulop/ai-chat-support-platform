import { useState } from 'react';

import checkAuthentication from '../utils/checkAuthentication';
import GetUserData from '../utils/getUserData';
import createNewApi from '../utils/createNewApi';

import ApiSettings from './apiSettings';

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
                <button onClick={createNewApi}>xd</button>

                {userData ? (
                    <div>
                        <ul>
                            {userData.apis.map((data, index) => (
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
            <ApiSettings apiKey={editingApiKey} />
        )
    }
};

export default Dashboard;
