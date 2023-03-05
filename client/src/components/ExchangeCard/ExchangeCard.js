import { useState } from "react";
import { InputWithLabel } from "../InputWithLabel/InputWithLabel"
import { SelectToken } from "../SelectToken/SelectToken";
import { Tabs } from "../Tabs/Tabs";
import { useExchange } from "../../hooks/useExchange";
import "./ExchangeCard.css";

export const ExchangeCard = () => {
    const { createMarketOrder, createLimitOrder, tokens, selectedToken, handleTokenChange, TRANSACTION_TYPES, ORDER_TYPES, orderTypeController, amountController, priceController } = useExchange();
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
                <button className="outlinedButton fullwidth" type="button" onClick={() => orderTypeController.value === ORDER_TYPES[0] ? createLimitOrder(TRANSACTION_TYPES[1]) : createMarketOrder(TRANSACTION_TYPES[1])} >{TRANSACTION_TYPES[1]}</button>
                <button className="filledButton fullwidth" type="button" onClick={() => orderTypeController.value === ORDER_TYPES[0] ? createLimitOrder(TRANSACTION_TYPES[0]) : createMarketOrder(TRANSACTION_TYPES[0])} >{TRANSACTION_TYPES[0]}</button>
            </div>
        </div>
    )
}