import { ConnectButton } from '@rainbow-me/rainbowkit';
import './NavBar.css';
export const NavBar = () => {
    return (
        <div className="navbar">
            <h1 className="navbarHeading">DEX</h1>
            <div className="rightSide">
                <ul className="navList">
                    <li>Exchange</li>
                    <li>Wallet</li>
                </ul>
                <ConnectButton />
            </div>
        </div>
    )
}