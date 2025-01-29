import { useState } from 'react';
import GetUserData from '../../utils/getUserData';
import createNewBot from '../../utils/createNewBot';
import BotInspection from './item/botInspection';
import './dashboard.css';

const Dashboard = () => {
    const [inspectingBotKey, setInspectingBotKey] = useState<string>("");
    const { userData, refreshUserData } = GetUserData();

    const handleCreateNewBot = async () => {
        try {
            await createNewBot();
            refreshUserData();
        } catch (error) {
            console.error('Error creating new bot:', error);
        }
    };

    if(!userData) {
        return <div>sign in</div>
    }
    
    if (inspectingBotKey === "") {
        return (
            <div className="container">
                <h1 className="heading">Dashboard</h1>
                <button className="button" onClick={handleCreateNewBot}>New Bot</button>

                {userData ? (
                    <div>
                        <ul className="botList">
                            {userData.bots.map((bot, index) => (
                                <li className="botListItem" key={index}>
                                    <p onClick={() => setInspectingBotKey(bot.botKey)}>
                                        {bot.botName.substring(0, 25)}...
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="loader">Loading user data...</p>
                )}
            </div>
        );
    } else {
        return (
            <div className="container">
                <button className="backButton" onClick={() => setInspectingBotKey("")}>Back</button>
                <BotInspection botKey={inspectingBotKey} />
            </div>
        );
    }
};

export default Dashboard;