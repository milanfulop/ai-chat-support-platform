import { useEffect, useState } from "react";
import axios from "axios";
import IBot from "../types/Bot";

const GetBotData = ({ botKey }: { botKey: string }) => {
    const [botData, setBotData] = useState<IBot | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBotData = async () => {
            setLoading(true);
            try {
                const res = await axios.post("http://localhost:5000/api/get-bot-data", { botKey });
                setBotData(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getBotData();
    }, [botKey]);

    return loading ? "loading" : botData;
};

export default GetBotData;
