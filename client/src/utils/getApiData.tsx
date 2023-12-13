import { useEffect, useState } from "react";
import axios from "axios";
import IAPI from "../types/Api";
const GetApiData = ({ apiKey }: { apiKey: string }) => {
    const [apiData, setApiData] = useState<IAPI>();

    useEffect(() => {
        const getApiData = async () => {
            axios.post("http://localhost:5000/api/get-api-data", { apiKey })
                .then((res) => {
                    setApiData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        };

        getApiData();
    }, []);

    return apiData;
}

export default GetApiData;