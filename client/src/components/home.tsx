import React from 'react';
import checkAuthentication from '../utils/checkAuthentication';
import styled from 'styled-components';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

const Home: React.FC = () => {
    const authStatus: AuthStatus = checkAuthentication(false);

    return (
        <Container>
            <Header>
                <Logo>AI Chat Support</Logo>
                <AuthStatusHeading>Authentication Status: {authStatus}</AuthStatusHeading>
                {authStatus === 'loading' ? (
                    <LoadingText>Loading...</LoadingText>
                ) : authStatus === 'authenticated' ? (
                    <DashboardLink href="/dashboard">Go to Dashboard</DashboardLink>
                ) : (
                    <AuthLinks>
                        <AuthLink href="/signup">Sign Up</AuthLink>
                        <AuthLink href="/login">Login</AuthLink>
                    </AuthLinks>
                )}
            </Header>

            <MainContent>
                <Heading>AI Chat Support Platform</Heading>
                <SubHeading>A platform that lets you deploy context customized chatbot AIs for your website.</SubHeading>
                <Description>Built for Learning Purposes.</Description>

                <Features>
                    <FeaturesTitle>Features</FeaturesTitle>
                    <FeaturesList>
                        <FeatureItem>Sign-up & Log-in with a Dashboard</FeatureItem>
                        <FeatureItem>Custom Bot Name & Context</FeatureItem>
                        <FeatureItem>Bot Deployment on Selected Websites</FeatureItem>
                        <FeatureItem>Answering Questions Based on Context</FeatureItem>
                        <FeatureItem>Analytics (Messages Sent, Tokens Used, etc.)</FeatureItem>
                        <FeatureItem>Custom Bot Profile Image Upload</FeatureItem>
                        <FeatureItem>Chatbox Color Scheme Editing</FeatureItem>
                        <FeatureItem>Web Scraping for Context</FeatureItem>
                        <FeatureItem>Conversation Starter Messages</FeatureItem>
                        <FeatureItem>Voice Recognition (Planned)</FeatureItem>
                        <FeatureItem>Quick Walkthrough to Add Bot to Your Website</FeatureItem>
                        <FeatureItem>Page Visibility Settings for Chatbox</FeatureItem>
                    </FeaturesList>
                </Features>

                <PotentialUpdates>
                    <UpdatesTitle>Potential Future Updates</UpdatesTitle>
                    <p>Check out our <TrelloLink href="https://trello.com">Trello</TrelloLink> for more updates.</p>
                </PotentialUpdates>
            </MainContent>
        </Container>
    );
};

// Styled components
const Container = styled.div`
    font-family: Arial, sans-serif;
    background-color: #f4f6f8;
    margin: 0;
    padding: 0;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    background-color: #007bff;
    color: white;
`;

const Logo = styled.h1`
    font-size: 24px;
    margin: 0;
`;

const AuthStatusHeading = styled.h2`
    font-size: 16px;
    margin: 0;
`;

const LoadingText = styled.p`
    font-size: 14px;
    color: #ff6600;
    font-weight: bold;
    margin: 0;
`;

const DashboardLink = styled.a`
    text-decoration: none;
    color: #fff;
    font-weight: bold;
`;

const AuthLinks = styled.div`
    display: flex;
    gap: 15px;
    justify-content: center;
`;

const AuthLink = styled.a`
    text-decoration: none;
    color: #fff;
    font-weight: bold;
`;

const MainContent = styled.main`
    padding: 40px 20px;
    text-align: center;
`;

const Heading = styled.h1`
    font-size: 36px;
    color: #333;
    margin-bottom: 10px;
    font-weight: bold;
`;

const SubHeading = styled.p`
    font-size: 20px;
    color: #555;
    margin-bottom: 20px;
`;

const Description = styled.p`
    font-size: 16px;
    color: #777;
    margin-bottom: 40px;
`;

const Features = styled.div`
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 800px;
    padding: 20px;
    margin-bottom: 40px;
`;

const FeaturesTitle = styled.h3`
    font-size: 24px;
    color: #333;
    font-weight: bold;
    margin-bottom: 15px;
`;

const FeaturesList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const FeatureItem = styled.li`
    font-size: 16px;
    color: #555;
    margin-bottom: 10px;
`;

const PotentialUpdates = styled.div`
    margin-bottom: 40px;
    text-align: center;
`;

const UpdatesTitle = styled.h3`
    font-size: 20px;
    color: #333;
    font-weight: bold;
    margin-bottom: 10px;
`;

const TrelloLink = styled.a`
    text-decoration: none;
    color: #007bff;
    font-weight: bold;
`;

export default Home;
