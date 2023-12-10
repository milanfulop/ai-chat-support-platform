import checkAuthentication from '../utils/checkAuthentication'
export default function Home() {

    const authenticated = checkAuthentication(false);

    return (
        <div>
            <h1>authentication status: {authenticated ? "true" : "false"}</h1>
            <a href="/signup">sign up</a>
            <a href="/login">login</a>
            <a href="/dashboard">dashboard</a>
        </div>
    )
}