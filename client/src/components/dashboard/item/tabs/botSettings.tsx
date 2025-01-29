import React, { useState, useEffect } from "react";
import axios from "axios";
import IBot from "../../../../types/Bot";
import styled from "styled-components";

const BotSettings = ({ botData }: { botData: IBot }) => {
    const [allowedSites, setAllowedSites] = useState<String[]>([]);
    const [allowedSiteInput, setAllowedSiteInput] = useState<string>("");
    const [contextInput, setContextInput] = useState<string>("");
    const [nameInput, setNameInput] = useState<string>("");
    const [isBotKeyBlurred, setIsBotKeyBlurred] = useState<boolean>(true); // State to track blur status
    const [copySuccess, setCopySuccess] = useState<boolean>(false); // State to track copy status

    useEffect(() => {
        if (botData) {
            setAllowedSites(botData.allowedSites);
            setNameInput(botData.botName);
            
            botData.context.forEach(content => {
                setContextInput(prevContextInput => prevContextInput + "\n" + content.pageContent);
            });
        }
    }, [botData]);

    const editBotData = (query: string, newData: any) => {
        axios.post("http://localhost:5000/api/edit-bot-data", { query, newData, botKey: botData.botKey })
            .catch((err) => {
                console.log(err);
            });
    };

    const editContextData = (query: string, newData: any) => {
        axios.post("http://localhost:5000/api/edit-context-data", { query, newData, botKey: botData.botKey })
            .catch((err) => {
                console.log(err);
            });
    };

    const sendAllowedSiteInput = () => {
        if (allowedSiteInput.length !== 0 && !allowedSites.includes(allowedSiteInput)) {
            setAllowedSites(oldSites => [...oldSites, allowedSiteInput]);
            editBotData("allowedSites", [...allowedSites, allowedSiteInput]);
        }
        setAllowedSiteInput("");
    };

    // Toggle blur on bot key
    const toggleBotKeyBlur = () => {
        setIsBotKeyBlurred(prev => !prev);
    };

    // Copy to clipboard function
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(botData.botKey);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
        } catch (err) {
            console.error("Failed to copy text: ", err);
            setCopySuccess(false);
        }
    };

    return (
        <Container>
            <Section>
                <SectionTitle>Context</SectionTitle>
                <TextArea
                    className="contextInput"
                    onChange={(event) => setContextInput(event.currentTarget.value)}
                    value={contextInput}
                    rows={16}
                />
                <SaveButton onClick={() => editContextData("context", contextInput)}>Save</SaveButton>
            </Section>

            <Section>
                <SectionTitle>Robot Name</SectionTitle>
                <Input
                    type="text"
                    className="nameInput"
                    onChange={(event) => setNameInput(event.currentTarget.value)}
                    value={nameInput}
                />
                <SaveButton onClick={() => editBotData("botName", nameInput)}>Save</SaveButton>
            </Section>

            <Section>
                <SectionTitle>Allowed Websites</SectionTitle>
                <AllowedSitesList>
                    {allowedSites.map((allowedSite, index) => (
                        <AllowedSiteItem key={index}>{allowedSite}</AllowedSiteItem>
                    ))}
                </AllowedSitesList>
                <Input
                    className="allowedSiteInput"
                    onChange={(event) => setAllowedSiteInput(event.target.value)}
                    type="text"
                    value={allowedSiteInput}
                    placeholder="Add a website"
                />
                <AddSiteButton onClick={sendAllowedSiteInput}>Add Site</AddSiteButton>
            </Section>

            <Section>
                <SectionTitle>Bot Key</SectionTitle>
                <BotKey
                    isBlurred={isBotKeyBlurred}
                    onClick={toggleBotKeyBlur} // Toggle blur when clicked
                    onDoubleClick={copyToClipboard} // Copy botKey when double-clicked
                >
                    {botData.botKey}
                </BotKey>
                {copySuccess && <CopySuccessMessage>Copied to clipboard!</CopySuccessMessage>}
            </Section>
        </Container>
    );
};

export default BotSettings;

// Styled Components
const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Section = styled.section`
    margin-bottom: 30px;
`;

const SectionTitle = styled.p`
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    resize: vertical;
    box-sizing: border-box;

    &:focus {
        border-color: #007bff;
        outline: none;
        background-color: #fafafa;
    }
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    margin-bottom: 12px;

    &:focus {
        border-color: #007bff;
        outline: none;
        background-color: #fafafa;
    }
`;

const SaveButton = styled.button`
    padding: 10px 20px;
    font-size: 14px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const AllowedSitesList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-bottom: 12px;
`;

const AllowedSiteItem = styled.li`
    background-color: #f1f1f1;
    padding: 8px;
    margin: 6px 0;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
`;

const AddSiteButton = styled.button`
    padding: 10px 20px;
    font-size: 14px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #218838;
    }
`;

const BotKey = styled.div<{ isBlurred: boolean }>`
    font-size: 16px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    user-select: none;
    padding: 12px;
    background-color: #f9f9f9;
    border-radius: 8px;
    border: 1px solid #ddd;
    transition: 0.3s;
    filter: ${({ isBlurred }) => (isBlurred ? "blur(5px)" : "none")};
    text-align: center;

    &:hover {
        filter: ${({ isBlurred }) => (isBlurred ? "blur(5px)" : "none")};
    }
`;

const CopySuccessMessage = styled.div`
    margin-top: 10px;
    color: green;
    font-weight: bold;
    font-size: 14px;
`;

