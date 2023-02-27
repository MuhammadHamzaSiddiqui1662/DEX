import { WagmiConfig } from 'wagmi'
import { Wallet } from './pages/Wallet/Wallet';
import { chains, client } from './config/wagmiConfig';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <WagmiConfig client={client}>
        <RainbowKitProvider chains={chains} theme={darkTheme({
          accentColor: "#00ff22",
          accentColorForeground: "black",
        })}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="/" element={<Wallet />} />
                {/* <Route path="test" element={<Test />} /> */}
                <Route path="*" element={<h3 style={{ color: "white" }}>Not Found</h3>} />
              </Route>
            </Routes>
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
