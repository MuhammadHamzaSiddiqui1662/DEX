import { useCallback, useState } from "react";
import { ExchangeCard } from "../../components/ExchangeCard/ExchangeCard"
import { Market } from "../../components/Market/Market"
import './Exchange.css';

import { TOKENS as ALL_TOKENS } from "../../config/constants";
const TOKENS = ALL_TOKENS.filter(token => token.symbol != "DAI");

export const Exchange = () => {
    const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
    const handleTokenChange = useCallback((e) => {
        setSelectedToken(TOKENS.filter(token => token.address === e.target.value)[0] || TOKENS[0])
    }, [])
    return (
        <div className="exchange">
            <ExchangeCard tokens={TOKENS} selectedToken={selectedToken} handleTokenChange={handleTokenChange} />
            <Market tokens={TOKENS} selectedToken={selectedToken} />
        </div>
    )
}