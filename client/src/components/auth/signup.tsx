import { useState } from "react"
import axios from "axios";
export default function Signup() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onEmailChange = (v: React.FormEvent<HTMLInputElement>) => {
        setEmail(v.currentTarget.value);
    }
    const onPasswordChange = (v: React.FormEvent<HTMLInputElement>) => {
        setPassword(v.currentTarget.value);
    }
    const onSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/signup", {
                email: email,
                password: password
            }, {
                withCredentials: true
            });

            console.log(response.data);
        } catch (error: any) {
            console.error("Signup failed:", error.response.data);
        }
    }


    return (
        <div>
            <input placeholder="email" type="text" onChange={onEmailChange} value={email} />
            <input placeholder="password" type="password" onChange={onPasswordChange} value={password} />
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}