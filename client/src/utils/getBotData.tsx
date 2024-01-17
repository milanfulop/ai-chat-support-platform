import { useEffect, useState } from "react";
import axios from "axios";
import IAPI from "../types/Bot";
const GetBotData = ({ botKey }: { botKey: string }) => {
    const [botData, setBotData] = useState<IAPI>();

    useEffect(() => {
        const getApiData = async () => {
            axios.post("http://localhost:5000/api/get-bot-data", { botKey })
                .then((res) => {
                    setBotData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        };

        getApiData();
    }, []);

    return botData;
}

export default GetBotData;