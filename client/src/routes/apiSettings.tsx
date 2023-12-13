import axios from "axios";
import { useState, useEffect } from "react";

const ApiSettings = ({ apiKey }: { apiKey: string }) => {
    const [allowedSites, setAllowedSites] = useState<string[]>([]);
    const [allowedSiteInput, setAllowedSiteInput] = useState<string>("");

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
        // This will be called whenever allowedSites changes
        editApiData("allowedSites", allowedSites);
    }, [allowedSites, apiKey]);

    return (
        <div>
            <p>{apiKey}</p>
            <div>
                <p>Allowed websites</p>
                <input onChange={onAllowedSiteInput} type="text" value={allowedSiteInput} />
                <button onClick={() => { sendAllowedSiteInput(); setAllowedSiteInput(""); }}>Add Site</button>
            </div>
        </div>
    );
};

export default ApiSettings;
