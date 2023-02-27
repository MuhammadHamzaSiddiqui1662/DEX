import { useState } from "react";
import { InputWithLabel } from "../../components/InputWithLabel/InputWithLabel"
import { SelectToken } from "../../components/SelectToken/SelectToken";
import { TransactionTypeTab } from "../../components/TransactionTypeTab/TransactionTypeTab";

export const Wallet = () => {
    const [tab, setTab] = useState(0);
    const [selectedToken, setSelectedToken] = useState(0);
    return (
        <div className="walletCard">
            <h2>Dex Wallet</h2>
            <TransactionTypeTab tab={tab} setTab={setTab} />
            <SelectToken selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
            <InputWithLabel label={"Amount"} type={"number"} />
            {/* <InputWithLabel label={"Output"} /> */}
            <button className="filledButton" type="button">SWAP</button>
        </div>
    )
}