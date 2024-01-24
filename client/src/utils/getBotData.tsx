import { useEffect, useState } from "react";
import axios from "axios";
import IBot from "../types/Bot";
const GetBotData = ({ botKey }: { botKey: string }) => {
    const [botData, setBotData] = useState<IBot>();

    useEffect(() => {
        const getBotData = async () => {
            axios.post("http://localhost:5000/api/get-bot-data", { botKey })
                .then((res) => {
                    setBotData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        };

        getBotData();
    }, [botKey]);

    return botData;
}

export default GetBotData;