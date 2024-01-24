import { useState } from 'react';

import checkAuthentication from '../../utils/checkAuthentication';
import GetUserData from '../../utils/getUserData';
import createNewBot from '../../utils/createNewBot';

import BotInspection from './item/botInspection';

const Dashboard = () => {
    //if this isn't empty, the rest of the dashboard will disappear and only the selected bot tab will show.
    const [inspectingBotKey, setInspectingBotKey] = useState<string>("");

    const isAuthenticated = checkAuthentication(true);
    const userData = GetUserData();

    if (inspectingBotKey === "") {
        return (
            <div>
                <h1>dahsboard {isAuthenticated ? "authed" : "unauthed"}</h1>
                <button onClick={createNewBot}>xd</button>

                {userData ? (
                    <div>
                        <ul>
                            {userData.botIDs.map((id, index) => (
                                <li key={index}>
                                    <p onClick={() => {
                                        setInspectingBotKey(id)
                                    }}>{id.substring(0, 25)}...</p>
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
            <div>
                <button onClick={() => setInspectingBotKey("")}>Back</button>
                <BotInspection botKey={inspectingBotKey} />
            </div>
        )
    }
};

export default Dashboard;
