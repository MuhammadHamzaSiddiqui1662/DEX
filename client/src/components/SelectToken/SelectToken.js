import "./SelectToken.css"
export const SelectToken = ({ tokens, selectedToken, handleTokenChange }) => {
    return (
        <select className="selectToken" value={selectedToken.address} onChange={handleTokenChange} >
            {tokens.map((token) => <option key={token.address} value={token.address}>{token.symbol}</option>)}
        </select>
    )
}