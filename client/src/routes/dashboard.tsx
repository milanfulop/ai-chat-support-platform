import React, { useEffect, useState } from 'react';
import checkAuthentication from '../utils/checkAuthentication';
import GetUserData from '../utils/getUserData';
import createNewApi from '../utils/createNewApi';

const Dashboard = () => {
    const isAuthenticated = checkAuthentication(true);
    const userData = GetUserData();

    return (
        <div>
            <h1>dahsboard {isAuthenticated ? "authed" : "unauthed"}</h1>
            <button onClick={createNewApi}>xd</button>

            {userData ? (
                <div>
                    <ul>
                        {userData.apis.map((data, index) => (
                            <li key={index}>{data}</li>
                        ))}
                    </ul>
                    {userData.email}
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default Dashboard;
