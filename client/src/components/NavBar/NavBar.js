import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from "react-router-dom";
import './NavBar.css';
export const NavBar = () => {
    return (
        <div className="navbar">
            <h1 className="navbarHeading">DEX</h1>
            <div className="rightSide">
                <ul className="navList">
                    <li><Link to="/">Exchange</Link></li>
                    <li><Link to="/wallet">Wallet</Link></li>
                </ul>
                <ConnectButton />
            </div>
        </div>
    )
}