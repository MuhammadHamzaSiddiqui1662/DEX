import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link, useLocation } from "react-router-dom";
import './NavBar.css';
export const NavBar = () => {
    const { pathname } = useLocation();
    return (
        <div className="navbar">
            <h1 className="navbarHeading">DEX</h1>
            <div className="rightSide">
                <ul className="navList">
                    <li className={pathname === "/" ? "active" : ""}>
                        <Link to="/">Exchange</Link>
                    </li>
                    <li className={pathname === "/wallet" ? "active" : ""}>
                        <Link to="/wallet">Wallet</Link>
                    </li>
                </ul>
                <ConnectButton />
            </div>
        </div>
    )
}