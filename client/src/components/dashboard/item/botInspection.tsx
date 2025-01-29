import { useState } from "react";
import TabManager from "./tabManager";
import IBot from "../../../types/Bot";
import GetBotData from "../../../utils/getBotData";

enum Tabs { "Settings", "Statistics" };

const BotInspection = ({ botKey }: { botKey: string }) => {
    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Settings);
    const botData: IBot | "loading" | null = GetBotData({ botKey });

    if(botData === "loading") {
        return <h1>loading</h1>
    }

    if(botData === null) {
        return <h1>null</h1>
    }

    return (
        <div>
            <div>
                <button onClick={() => setCurrentTab(Tabs.Settings)}>Settings</button>
                <button onClick={() => setCurrentTab(Tabs.Statistics)}>Statistics</button>
            </div>

            <TabManager botData={botData} currentTab={currentTab}></TabManager>
        </div>
    )
}
export default BotInspection