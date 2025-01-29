import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function Signup() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const onEmailChange = (v: React.FormEvent<HTMLInputElement>) => {
        setEmail(v.currentTarget.value);
    };

    const onPasswordChange = (v: React.FormEvent<HTMLInputElement>) => {
        setPassword(v.currentTarget.value);
    };

    const onSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:5000/api/signup",
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                }
            );

            console.log(response.data);
        } catch (error: any) {
            console.error("Signup failed:", error.response.data);
            setError("Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Form>
                <Heading>Create Account</Heading>
                <Input
                    placeholder="Email"
                    type="email"
                    onChange={onEmailChange}
                    value={email}
                    disabled={loading}
                />
                <Input
                    placeholder="Password"
                    type="password"
                    onChange={onPasswordChange}
                    value={password}
                    disabled={loading}
                />
                <SubmitButton onClick={onSubmit} disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                </SubmitButton>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Form>
        </Container>
    );
}

// Styled components
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f6f8;
    padding: 0 20px;
`;

const Form = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
`;

const Heading = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    background-color: #f9f9f9;
    transition: 0.3s ease-in-out;

    &:focus {
        border-color: #007bff;
        outline: none;
        background-color: #fff;
    }

    &:disabled {
        background-color: #e0e0e0;
        cursor: not-allowed;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 12px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 15px;
`;

