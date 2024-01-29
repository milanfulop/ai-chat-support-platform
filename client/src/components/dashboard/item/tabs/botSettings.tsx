import axios from "axios";
import { useState, useEffect } from "react";
import GetApiData from "../../../../utils/getBotData";
import IAPI from "../../../../types/Bot";
import './botSettings.css';

const BotSettings = ({ botKey }: { botKey: string }) => {
    const [allowedSites, setAllowedSites] = useState<String[]>([]);
    const [allowedSiteInput, setAllowedSiteInput] = useState<string>("");

    const [contextInput, setContextInput] = useState<string>("");

    const [nameInput, setNameInput] = useState<string>("");

    const apiData: IAPI | undefined = GetApiData({ botKey });

    useEffect(() => {
        if (apiData) {
            setAllowedSites(apiData.allowedSites)
            setNameInput(apiData.botName)
            apiData.context.forEach(content => {
                setContextInput(prevContextInput => prevContextInput + "\n" + content.pageContent);
            });
        }
    }, [apiData])

    const editApiData = (query: string, newData: any) => {
        axios.post("http://localhost:5000/api/edit-bot-data", { query, newData, botKey })
            .catch((err) => {
                console.log(err);
            })
    };

    const editContextData = (query: string, newData: any) => {
        axios.post("http://localhost:5000/api/edit-context-data", { query, newData, botKey })
            .catch((err) => {
                console.log(err);
            })
    };

    const sendAllowedSiteInput = () => {
        setAllowedSites(oldSites => [...oldSites, allowedSiteInput]);

        if (allowedSiteInput.length !== 0 && !allowedSites.includes(allowedSiteInput)) {
            editApiData("allowedSites", [...allowedSites, allowedSiteInput]);
        }

        setAllowedSiteInput("");
    };

    return (
        <div className="container">
            <p>{botKey}</p>

            <section>
                <p>Context</p>
                <textarea className="contextInput" onChange={(event) => setContextInput(event.currentTarget.value)} value={contextInput} rows={16} />
                <button className="saveButton" onClick={() => editContextData("context", contextInput)}>Save</button>
            </section>

            <section>
                <p>Robot name</p>
                <input type="text" className="nameInput" onChange={(event) => setNameInput(event.currentTarget.value)} value={nameInput} />
                <button className="saveButton" onClick={() => editApiData("botName", nameInput)}>Save</button>
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
