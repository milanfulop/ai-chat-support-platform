import axios from "axios";
import { useState, useEffect } from "react";
import GetApiData from "../utils/getApiData";
import IAPI from "../types/Api";

const ApiSettings = ({ apiKey }: { apiKey: string }) => {
    const [allowedSites, setAllowedSites] = useState<String[]>([]);
    const [allowedSiteInput, setAllowedSiteInput] = useState<string>("");

    const [contextInput, setContextInput] = useState<string>("");

    const apiData: IAPI | undefined = GetApiData({ apiKey });
    useEffect(() => {
        if (apiData) {
            setAllowedSites(apiData.allowedSites)
            console.log(apiData.allowedSites)
        }
    }, [apiData])

    const editApiData = (query: string, newData: any) => {
        axios.post("http://localhost:5000/api/edit-api-data", { query, newData, apiKey })
    };

    //editing context data requires a bit more complex saving into the db
    const editContextData = (query: string, newData: any) => {
        axios.post("http://localhost:5000/api/edit-context-data", { query, newData, apiKey })
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

    const onContextInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContextInput(event.currentTarget.value);
    }

    const sendAllowedSiteInput = () => {
        setAllowedSites(oldSites => [...oldSites, allowedSiteInput]);
        setAllowedSiteInput("");
    };

    const sendContext = () => {
        editContextData("context", contextInput);
    }
    useEffect(() => {
        if (allowedSites.length != 0 && allowedSites != apiData?.allowedSites) {
            editApiData("allowedSites", allowedSites);
        }
    }, [allowedSites]);

    return (
        <div>
            <p>{apiKey}</p>

            <div>
                <p>Context</p>
                <textarea onChange={onContextInput} value={contextInput} />
                <button onClick={sendContext}>Save</button>
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

export default ApiSettings;
