import { WagmiProvider, createConfig, http } from "wagmi";
import { Chain } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const lensSepolia = {
    id: 37_111,
    name: 'Lens Network Sepolia Testnet',
    // iconUrl: 'https://block-explorer.testnet.lens.dev/favicon.ico', // Assuming a suitable icon URL
    // iconBackground: '#fff',
    nativeCurrency: { name: 'Grass', symbol: 'GRASS', decimals: 18 },
    rpcUrls: {
      default: { http: ['https://rpc.testnet.lens.dev'] },
    },
    blockExplorers: {
      default: { name: 'Lens Block Explorer', url: 'https://block-explorer.testnet.lens.dev' },
    },
    contracts: {
      multicall3: {
        address: '0xYourMulticall3ContractAddressHere',
        blockCreated: 11_907_934, // Replace with the appropriate block
      },
    },
  } as const satisfies Chain;
  
const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [lensSepolia],
    transports: {
      // RPC URL for each chain
      [lensSepolia.id]: http(
        `https://rpc.testnet.lens.dev`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",

    // Required App Info
    appName: "PuzzleSocial",

    // Optional App Info
    appDescription: "Puzzle Social",
    appUrl: "http://localhost:3000/", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};