import { useState } from "react";
import { InputWithLabel } from "../../components/InputWithLabel/InputWithLabel"
import { SelectToken } from "../../components/SelectToken/SelectToken";
import { Tabs } from "../../components/Tabs/Tabs";
import "./Wallet.css";

const tabs = ["Deposit", "Withdraw"];

export const Wallet = () => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [selectedToken, setSelectedToken] = useState(0);
    return (
        <div className="walletCard">
            <h2>Dex Wallet</h2>
            <Tabs tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <SelectToken selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
            <InputWithLabel label={"Amount"} type={"number"} />
            {/* <InputWithLabel label={"Output"} /> */}
            <button className="filledButton" type="button">SWAP</button>
        </div>
    )
}