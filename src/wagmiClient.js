import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// import { Buffer } from "buffer";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { createClient, configureChains} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { polygonMumbai } from 'wagmi/chains'

// polyfill Buffer for client***
// if (!window.Buffer) {
// 	window.Buffer = Buffer;
// }

// Chains for connectors to support
const { chains, provider, webSocketProvider } = configureChains(
	[polygonMumbai], [alchemyProvider({ apiKey: 'PWm_8NSBYOzhzgKoTGiG2qpPzjZNDL50' }), publicProvider()],
)

// Set up connectors
export const client = createClient({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: 'wagmi',
			},
		}),
		new WalletConnectConnector({
			chains,
			options: {
				qrcode: true,
			},
		}),
		new InjectedConnector({
			chains,
			options: {
				name: 'Injected',
				shimDisconnect: true,
			},
		}),
	],
	provider,
	webSocketProvider,
})

