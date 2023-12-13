import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const onEmailChange = (v: React.FormEvent<HTMLInputElement>) => {
        setEmail(v.currentTarget.value);
    }

    const onPasswordChange = (v: React.FormEvent<HTMLInputElement>) => {
        setPassword(v.currentTarget.value);
    }

    const onSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:5000/api/login", {
                email: email,
                password: password
            }, {
                withCredentials: true
            });

            navigate('/');
        } catch (error: any) {
            console.error("Login failed:", error.response.data);
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <input placeholder="email" type="text" onChange={onEmailChange} value={email} />
            <input placeholder="password" type="password" onChange={onPasswordChange} value={password} />
            <button onClick={onSubmit} disabled={loading}>Submit</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}
