import { WagmiConfig } from 'wagmi'
import { Wallet } from './pages/Wallet/Wallet';
import { chains, client } from './config/wagmiConfig';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'sweetalert2/src/sweetalert2.scss';
import './App.css';
import { Home } from './pages/Home/Home';
import { Exchange } from './pages/Exchange/Exchange';
import { WalletProvider } from './context/WalletProvider';
import { ToastContainer } from "react-toastify";
import { Orders } from './pages/Orders/Orders';

function App() {
  return (
    <div className="App">
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains} theme={darkTheme({
          accentColor: "#00ff22",
          accentColorForeground: "black",
        })}>
          <WalletProvider>
            <ToastContainer />
            <Router>
              <Routes>
                <Route path="/" element={<Home />}>
                  <Route path="/" element={<Exchange />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="*" element={<h3 style={{ color: "white" }}>Not Found</h3>} />
                </Route>
              </Routes>
            </Router>
          </WalletProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
