export const SelectToken = ({ selectedToken, setSelectedToken }) => {
    return (
        <select className="selectToken" value={selectedToken} onChange={e => setSelectedToken(e.target.value)} >
            <option value={0}>DAI</option>
            <option value={1}>BAT</option>
            <option value={2}>REP</option>
            <option value={3}>ZRX</option>
        </select>
    )
}