import { useState } from "react";
import { InputWithLabel } from "../InputWithLabel/InputWithLabel"
import { SelectToken } from "../SelectToken/SelectToken";
import { Tabs } from "../Tabs/Tabs";

const tabs = ["Deposit", "Withdraw"];

export const ExchangeCard = () => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [selectedToken, setSelectedToken] = useState(0);
    return (
        <div className="exchangeCard">
            <h2 className="exchangeHeading">Dex Wallet</h2>
            <Tabs tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <SelectToken selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
            <InputWithLabel label={"Amount"} type={"number"} />
            <button className="filledButton" type="button">SWAP</button>
        </div>
    )
}