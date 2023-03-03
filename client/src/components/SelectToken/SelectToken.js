import "./SelectToken.css"
export const SelectToken = ({ tokens, selectedToken, handleTokenChange, position = "" }) => {
    return (
        <select className="selectToken" style={{ position: position }} value={selectedToken.address} onChange={handleTokenChange} >
            {tokens.map((token) => <option key={token.address} value={token.address}>{token.symbol}</option>)}
        </select>
    )
}