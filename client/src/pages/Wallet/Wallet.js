import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { InputWithLabel } from "../../components/InputWithLabel/InputWithLabel"
import { SelectToken } from "../../components/SelectToken/SelectToken";
import { Tabs } from "../../components/Tabs/Tabs";
import { useWallet } from "../../hooks/useWallet";
import "./Wallet.css";

const tabs = ["Deposit", "Withdraw"];
const tokens = ["DAI", "BAT", "REP", "ZRX"];

export const Wallet = () => {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);
    const [selectedToken, setSelectedToken] = useState(0);
    const { balance, daiBalance, batBalance, repBalance, zrxBalance, isLoading } = useWallet();

    useEffect(() => {
        console.log("balance", balance);
        console.log("daiBalance", daiBalance);
        console.log("batBalance", batBalance);
        console.log("repBalance", repBalance);
        console.log("zrxBalance", zrxBalance);
    }, [daiBalance])

    return (
        <div className="wallet">
            <div className="walletCard">
                <h2>Dex Wallet</h2>
                <Tabs tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <div className="balances">
                    <div className="dex-balance">
                        <p>DEX</p>
                        <p>{`${ethers.utils.formatEther(daiBalance)} ${tokens[selectedToken]}`}</p>
                    </div>
                    <div className="wallet-balance">
                        <p>Wallet</p>
                        <p>{`${ethers.utils.formatEther(daiBalance)} ${tokens[selectedToken]}`}</p>
                    </div>
                </div>
                <InputWithLabel label={"Amount"} type={"number"} fullwidth={true} >
                    <SelectToken tokens={tokens} selectedToken={selectedToken} setSelectedToken={setSelectedToken} />
                </InputWithLabel>
                {/* <InputWithLabel label={"Output"} /> */}
                <button className="filledButton fullwidth" type="button">{selectedTab}</button>
            </div>
        </div>
    )
}