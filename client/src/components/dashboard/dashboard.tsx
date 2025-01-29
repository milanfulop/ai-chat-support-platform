import React, { useState } from 'react';
import GetUserData from '../../utils/getUserData';
import createNewBot from '../../utils/createNewBot';
import BotInspection from './item/botInspection';
import styled from 'styled-components';

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

    if (!userData) {
        return <SignInMessage>Please sign in to view your dashboard.</SignInMessage>;
    }

    if (inspectingBotKey === "") {
        return (
            <Container>
                <Heading>Dashboard</Heading>
                <CreateBotButton onClick={handleCreateNewBot}>Create New Bot</CreateBotButton>

                {userData ? (
                    <BotList>
                        {userData.bots.map((bot, index) => (
                            <BotListItem key={index} onClick={() => setInspectingBotKey(bot.botKey)}>
                                <BotName>{bot.botName.substring(0, 25)}</BotName>
                            </BotListItem>
                        ))}
                    </BotList>
                ) : (
                    <Loader>Loading user data...</Loader>
                )}
            </Container>
        );
    } else {
        return (
            <Container>
                <BackButton onClick={() => { setInspectingBotKey(""); refreshUserData(); }}>Back</BackButton>
                <BotInspection botKey={inspectingBotKey} />
            </Container>
        );
    }
};

export default Dashboard;

// Styled Components
const Container = styled.div`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f6f8;
    padding: 20px;
`;

const Heading = styled.h1`
    font-size: 36px;
    color: #333;
    font-weight: bold;
    margin-bottom: 20px;
`;

const CreateBotButton = styled.button`
    padding: 12px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    margin-bottom: 20px;

    &:hover {
        background-color: #0056b3;
    }
`;

const SignInMessage = styled.div`
    font-size: 18px;
    color: #333;
    font-weight: bold;
    margin-top: 50px;
`;

const BotList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 600px;
`;

const BotListItem = styled.li`
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    
    &:hover {
        background-color: #f0f0f0;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
`;

const BotName = styled.p`
    font-size: 18px;
    color: #333;
`;

const BackButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 20px;
    
    &:hover {
        background-color: #5a6268;
    }
`;

const Loader = styled.div`
    font-size: 18px;
    color: #333;
    margin-top: 20px;
    font-style: italic;
`;

