export const TransactionTypeTab = ({ tab, setTab }) => {
    return (
        <div className="transactionTypeTab">
            <div className={tab === 0 ? "active" : null} onClick={() => setTab(0)}>Deposite</div>
            <div className={tab === 1 ? "active" : null} onClick={() => setTab(1)}>Withdraw</div>
        </div>
    )
}