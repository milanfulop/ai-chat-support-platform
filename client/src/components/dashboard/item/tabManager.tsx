import BotSettings from "./tabs/botSettings";
import Tabs from '../../../types/Tabs';
import IBot from "../../../types/Bot";

const TabManager = ({ botData, currentTab }: { botData: IBot, currentTab: Tabs }) => {
    switch (currentTab) {
        case Tabs.Settings:
            return <BotSettings botData={botData} />;
        case Tabs.Statistics:
            return <div>Statistics Content</div>;
        default:
            return null;
    }
}
export default TabManager