import { ethers } from "ethers";
import { useState } from "react";
import { InputWithLabel } from "../../components/InputWithLabel/InputWithLabel"
import { SelectToken } from "../../components/SelectToken/SelectToken";
import { Tabs } from "../../components/Tabs/Tabs";
import { useWallet } from "../../hooks/useWallet";
import "./WalletCard.css";
import { CircularLoader } from "../CircularLoader/CircularLoader";

const TABS = ["Deposit", "Withdraw"];

export const WalletCard = () => {
    const [selectedTab, setSelectedTab] = useState(TABS[0]);
    const { tokens, selectedToken, handleTokenChange, getWalletBalance, getDexBalance, deposit, withdraw, amountController, isConnected, connectWallet, isLoading } = useWallet();

    return (
        <div className="walletCard">
            <h2>Dex Wallet</h2>
            <Tabs tabs={TABS} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <div className="balances">
                <div className="dex-balance">
                    <p>DEX</p>
                    <p>{`${ethers.utils.formatEther(getDexBalance() ?? ethers.BigNumber.from(0))} ${selectedToken.symbol}`}</p>
                </div>
                <div className="wallet-balance">
                    <p>Wallet</p>
                    <p>{`${ethers.utils.formatEther(getWalletBalance() ?? ethers.BigNumber.from(0))} ${selectedToken.symbol}`}</p>
                </div>
            </div>
            <InputWithLabel label={"Amount"} type={"number"} fullwidth={true} value={amountController.value} setValue={amountController.setValue} placeholder={"Enter Amount..."} >
                <SelectToken tokens={tokens} selectedToken={selectedToken} handleTokenChange={handleTokenChange} position="absolute" />
            </InputWithLabel>
            <button
                className="filledButton fullwidth"
                disabled={isLoading} type="button"
                onClick={isConnected ? selectedTab === TABS[0] ? deposit : withdraw : connectWallet}>
                {
                    isConnected ?
                        isLoading ?
                            <CircularLoader size={30} /> :
                            selectedTab :
                        `Connect Wallet`
                }
            </button>
        </div>
    )
}