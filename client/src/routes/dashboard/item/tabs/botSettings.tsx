import axios from "axios";
import { useState, useEffect } from "react";
import GetApiData from "../../../../utils/getBotData";
import IAPI from "../../../../types/Bot";

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
    };

    //editing context data requires a bit more complex saving into the db
    const editContextData = (query: string, newData: any) => {
        axios.post("http://localhost:5000/api/edit-context-data", { query, newData, botKey })
            .then(() => {
                console.log("saved");
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const onAllowedSiteInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllowedSiteInput(event.target.value);
    };
    const sendAllowedSiteInput = () => {
        setAllowedSites(oldSites => [...oldSites, allowedSiteInput]);

        if (allowedSiteInput.length !== 0 && !allowedSites.includes(allowedSiteInput)) {
            editApiData("allowedSites", [...allowedSites, allowedSiteInput]);
        }

        setAllowedSiteInput("");
    };

    const onContextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContextInput(event.currentTarget.value);
    }
    const sendContext = () => {
        editContextData("context", contextInput);
    }

    const onNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameInput(event.currentTarget.value);
    }
    const sendName = () => {
        editApiData("botName", nameInput)
    }

    return (
        <div>
            <p>{botKey}</p>

            <div>
                <p>Context</p>
                <textarea onChange={onContextInput} value={contextInput} />
                <button onClick={sendContext}>Save</button>
            </div>

            <div>
                <p>Robot name</p>
                <input type="text" onChange={onNameInput} value={nameInput} />
                <button onClick={sendName}>Save</button>
            </div>

            <div>
                <p>Allowed websites</p>
                <ul>
                    {allowedSites.map((allowedSite, index) => (
                        <li key={index}>{allowedSite}</li>
                    ))}
                </ul>
                <input onChange={onAllowedSiteInput} type="text" value={allowedSiteInput} />
                <button onClick={sendAllowedSiteInput}>Add Site</button>
            </div>
        </div>
    );
};

export default BotSettings;
