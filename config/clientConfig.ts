import { createClient, chain, configureChains, allChains, chainId } from 'wagmi'
import magicWallet from 'config/wallets/magic'
import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

const SOURCE_NAME = process.env.NEXT_PUBLIC_SOURCE_NAME
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID

const envChain = allChains.find(
  (chain) => chain.id === +(CHAIN_ID || chainId.mainnet)
)

export const { chains, provider, webSocketProvider } = configureChains(
  envChain ? [envChain] : [chain.mainnet],
  [alchemyProvider({ apiKey: alchemyId }), publicProvider()]
)

const { wallets } = getDefaultWallets({
  appName: SOURCE_NAME || 'Reservoir Market',
  chains,
})

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'New',
    wallets: [magicWallet({ chains })],
  },
])

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})
