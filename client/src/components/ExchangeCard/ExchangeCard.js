import { useState } from "react";
import { InputWithLabel } from "../InputWithLabel/InputWithLabel"
import { SelectToken } from "../SelectToken/SelectToken";
import { Tabs } from "../Tabs/Tabs";
import { useExchange } from "../../hooks/useExchange";
import "./ExchangeCard.css";

export const ExchangeCard = () => {
    const { tokens, selectedToken, handleTokenChange, ORDER_TYPES, orderTypeController, amountController, priceController } = useExchange();
    return (
        <div className="exchangeCard">
            <h2 className="exchangeHeading">Exchange</h2>
            <div></div>
            <Tabs tabs={ORDER_TYPES} selectedTab={orderTypeController.value} setSelectedTab={orderTypeController.setValue} />
            <div></div>
            <InputWithLabel
                label={"Amount"}
                type={"number"}
                fullwidth={true}
                value={amountController.value}
                setValue={amountController.setValue}
                placeholder={"Enter Amount..."}
            >
                <SelectToken tokens={tokens} selectedToken={selectedToken} handleTokenChange={handleTokenChange} position="absolute" />
            </InputWithLabel>
            {
                orderTypeController.value === "Limit" &&
                <InputWithLabel
                    label={"Price"}
                    type={"number"}
                    fullwidth={true}
                    value={priceController.value}
                    setValue={priceController.setValue}
                    placeholder={"Enter Desired Price..."}
                />
            }
            <div className="buttonSection" >
                <button className="outlinedButton fullwidth" type="button">SELL</button>
                <button className="filledButton fullwidth" type="button">BUY</button>
            </div>
        </div>
    )
}