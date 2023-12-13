import axios from "axios";
import { useState, useEffect } from "react";
import GetApiData from "../utils/getApiData";
import IAPI from "../types/Api";

const ApiSettings = ({ apiKey }: { apiKey: string }) => {
    const [allowedSites, setAllowedSites] = useState<String[]>([]);
    const [allowedSiteInput, setAllowedSiteInput] = useState<string>("");

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

    const onAllowedSiteInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAllowedSiteInput(event.target.value);
    };

    const sendAllowedSiteInput = () => {
        setAllowedSites(oldSites => [...oldSites, allowedSiteInput]);
    };

    useEffect(() => {
        if (allowedSites.length != 0 && allowedSites != apiData?.allowedSites) {
            editApiData("allowedSites", allowedSites);
        }
    }, [allowedSites]);

    return (
        <div>
            <p>{apiKey}</p>
            <div>
                <p>Allowed websites</p>
                <ul>
                    {allowedSites.map((allowedSite, index) => (
                        <li key={index}>{allowedSite}</li>
                    ))}
                </ul>
                <input onChange={onAllowedSiteInput} type="text" value={allowedSiteInput} />
                <button onClick={() => { sendAllowedSiteInput(); setAllowedSiteInput(""); }}>Add Site</button>
            </div>
        </div>
    );
};

export default ApiSettings;
