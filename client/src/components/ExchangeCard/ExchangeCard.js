import { useState } from "react";
import { InputWithLabel } from "../InputWithLabel/InputWithLabel"
import { SelectToken } from "../SelectToken/SelectToken";
import { Tabs } from "../Tabs/Tabs";
import "./ExchangeCard.css";

const tabs = ["Limit", "Market"];
const tokens = ["BAT", "REP", "ZRX"];

export const ExchangeCard = () => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [selectedToken, setSelectedToken] = useState(0);
    return (
        <div className="exchangeCard">
            <h2 className="exchangeHeading">Exchange</h2>
            <div></div>
            <Tabs tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <SelectToken tokens={tokens} selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
            <div></div>
            <InputWithLabel label={"Amount"} type={"number"} fullwidth={true} />
            {selectedTab === "Limit" && <InputWithLabel label={"Price"} type={"number"} fullwidth={true} />}
            <div className="buttonSection" >
                <button className="filledButton fullwidth" type="button">BUY</button>
                <button className="outlinedButton fullwidth" type="button">SELL</button>
            </div>
        </div>
    )
}