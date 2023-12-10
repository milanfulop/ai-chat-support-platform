import checkAuthentication from '../utils/checkAuthentication';

const Dashboard = () => {
    const isAuthenticated = checkAuthentication(true);

    return (
        <div>
            <h1>dahsboard {isAuthenticated ? "true" : "false"}</h1>
        </div>
    );
};

export default Dashboard;
