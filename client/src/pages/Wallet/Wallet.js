import { ethers } from "ethers";
import { useState } from "react";
import { InputWithLabel } from "../../components/InputWithLabel/InputWithLabel"
import { SelectToken } from "../../components/SelectToken/SelectToken";
import { Tabs } from "../../components/Tabs/Tabs";
import { useWallet } from "../../hooks/useWallet";
import "./Wallet.css";

const TABS = ["Deposit", "Withdraw"];

export const Wallet = () => {
    const [selectedTab, setSelectedTab] = useState(TABS[0]);
    const { tokens, selectedToken, handleTokenChange, getWalletBalance, getDexBalance, deposit, amountController, isLoading } = useWallet();

    return (
        <div className="wallet">
            <div className="walletCard">
                <h2>Dex Wallet</h2>
                <Tabs tabs={TABS} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <div className="balances">
                    <div className="dex-balance">
                        <p>DEX</p>
                        <p>{`${ethers.utils.formatEther(getDexBalance())} ${selectedToken.symbol}`}</p>
                    </div>
                    <div className="wallet-balance">
                        <p>Wallet</p>
                        <p>{`${ethers.utils.formatEther(getWalletBalance())} ${selectedToken.symbol}`}</p>
                    </div>
                </div>
                <InputWithLabel label={"Amount"} type={"number"} fullwidth={true} value={amountController.value} setValue={amountController.setValue} >
                    <SelectToken tokens={tokens} selectedToken={selectedToken} handleTokenChange={handleTokenChange} />
                </InputWithLabel>
                <button className="filledButton fullwidth" disabled={isLoading} type="button" onClick={deposit}>{isLoading ? `Loading...` : selectedTab}</button>
            </div>
        </div>
    )
}