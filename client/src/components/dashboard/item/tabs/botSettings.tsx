import axios from "axios";
import { useState, useEffect } from "react";
import IBot from "../../../../types/Bot";
import './botSettings.css';

const BotSettings = ({ botData }: { botData: IBot }) => {
    const [allowedSites, setAllowedSites] = useState<String[]>([]);
    const [allowedSiteInput, setAllowedSiteInput] = useState<string>("");

    const [contextInput, setContextInput] = useState<string>("");

    const [nameInput, setNameInput] = useState<string>("");

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
            })
    };

    const editContextData = (query: string, newData: any) => {
        axios.post("http://localhost:5000/api/edit-context-data", { query, newData, botKey: botData.botKey })
            .catch((err) => {
                console.log(err);
            })
    };

    const sendAllowedSiteInput = () => {
        setAllowedSites(oldSites => [...oldSites, allowedSiteInput]);

        if (allowedSiteInput.length !== 0 && !allowedSites.includes(allowedSiteInput)) {
            editBotData("allowedSites", [...allowedSites, allowedSiteInput]);
        }

        setAllowedSiteInput("");
    };

    return (
        <div className="container">
            <section>
                <p>Context</p>
                <textarea className="contextInput" onChange={(event) => setContextInput(event.currentTarget.value)} value={contextInput} rows={16} />
                <button className="saveButton" onClick={() => editContextData("context", contextInput)}>Save</button>
            </section>

            <section>
                <p>Robot name</p>
                <input type="text" className="nameInput" onChange={(event) => setNameInput(event.currentTarget.value)} value={nameInput} />
                <button className="saveButton" onClick={() => editBotData("botName", nameInput)}>Save</button>
            </section>

            <section>
                <p>Allowed websites</p>
                <ul className="allowedSitesList">
                    {allowedSites.map((allowedSite, index) => (
                        <li key={index}>{allowedSite}</li>
                    ))}
                </ul>
                <input className="allowedSiteInput" onChange={(event) => setAllowedSiteInput(event.target.value)} type="text" value={allowedSiteInput} />
                <button className="addSiteButton" onClick={sendAllowedSiteInput}>Add Site</button>
            </section>
        </div>
    );
};

export default BotSettings;
