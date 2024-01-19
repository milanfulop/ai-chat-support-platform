import { useState, useEffect } from "react";
import BotSettings from "./tabs/botSettings";
import Tabs from './Tabs';

const TabManager = ({ botKey, currentTab }: { botKey: string, currentTab: Tabs }) => {
    switch (currentTab) {
        case Tabs.Settings:
            return <BotSettings botKey={botKey} />;
        case Tabs.Statistics:
            return <div>Statistics Content</div>;
        default:
            return null;
    }
}
export default TabManager