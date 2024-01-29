import { useState } from "react";
import TabManager from "./tabManager";

enum Tabs { "Settings", "Statistics" };

const BotInspection = ({ botKey }: { botKey: string }) => {
    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Settings);

    return (
        <div>
            <div>
                <button onClick={() => setCurrentTab(Tabs.Settings)}>Settings</button>
                <button onClick={() => setCurrentTab(Tabs.Statistics)}>Statistics</button>
            </div>

            <TabManager botKey={botKey} currentTab={currentTab}></TabManager>
        </div>
    )
}
export default BotInspection