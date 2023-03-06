import { createClient, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { mainnet, goerli, hardhat } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';

export const { chains, provider, webSocketProvider } = configureChains(
    [goerli, hardhat, mainnet],
    [
        alchemyProvider({ apiKey: process.env.REACT_APP_ETHERSCAN_API_KEY }),
        publicProvider()
    ],
)

const { connectors } = getDefaultWallets({
    appName: 'Dex',
    chains
});

export const client = createClient({
    autoConnect: true,
    provider,
    connectors,
})
