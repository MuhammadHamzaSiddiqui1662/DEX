import { useState } from "react";
import { InputWithLabel } from "../InputWithLabel/InputWithLabel"
import { SelectToken } from "../SelectToken/SelectToken";
import { TransactionTypeTab } from "../TransactionTypeTab/TransactionTypeTab";

export const ExchangeCard = () => {
    const [tab, setTab] = useState(0);
    const [selectedToken, setSelectedToken] = useState(0);
    return (
        <div className="exchangeCard">
            <h2 className="exchangeHeading">Dex Wallet</h2>
            <TransactionTypeTab tab={tab} setTab={setTab} />
            <SelectToken selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
            <InputWithLabel label={"Amount"} type={"number"} />
            {/* <InputWithLabel label={"Output"} /> */}
            <button className="filledButton" type="button">SWAP</button>
        </div>
    )
}