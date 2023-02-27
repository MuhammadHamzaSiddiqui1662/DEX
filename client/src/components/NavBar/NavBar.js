import './NavBar.css';
export const NavBar = () => {
    return (
        <div className="navbar">
            <h1>DEX</h1>
            <div className="rightSide">
                <ul className="navList">
                    <li>Exchange</li>
                    <li>Wallet</li>
                </ul>
            </div>
        </div>
    )
}