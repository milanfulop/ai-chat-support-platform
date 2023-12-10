import checkAuthentication from '../utils/checkAuthentication';
import GetUserData from '../utils/getUserData';

const Dashboard = () => {
    const isAuthenticated = checkAuthentication(true);
    GetUserData();

    const createNewApi = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/create-new-api', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
        }
    };

    return (
        <div>
            <h1>dahsboard {isAuthenticated ? "authed" : "unauthed"}</h1>
            <button onClick={createNewApi}>xd</button>
        </div>
    );
};

export default Dashboard;
