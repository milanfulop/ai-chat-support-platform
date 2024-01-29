import checkAuthentication from '../utils/checkAuthentication';
import './home.css';

export default function Home() {
    const authenticated = checkAuthentication(false);

    return (
        <div className="container">
            <h1 className="heading">Authentication Status: {authenticated ? "true" : "false"}</h1>
            {authenticated ?
                (
                    <a className="link" href="/dashboard">Dashboard</a>
                ) : (
                    <div>
                        <a className="link" href="/signup">Sign Up</a>
                        <a className="link" href="/login">Login</a>
                    </div>
                )
            }
        </div>
    );
}
