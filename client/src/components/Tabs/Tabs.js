import './Tabs.css';
export const Tabs = ({ tabs, selectedTab, setSelectedTab }) => {
    return (
        <div className="tabs">
            {tabs.map(tab => <div key={tab} className={tab === selectedTab ? "active" : null} onClick={() => setSelectedTab(tab)}>{tab}</div>)}
        </div>
    )
}