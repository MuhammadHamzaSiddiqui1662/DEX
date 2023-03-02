import "./SelectToken.css"
export const SelectToken = ({ tokens, selectedToken, setSelectedToken }) => {
    return (
        <select className="selectToken" value={selectedToken} onChange={e => setSelectedToken(e.target.value)} >
            {tokens.map((token, index) => <option key={index} value={index}>{token}</option>)}
        </select>
    )
}