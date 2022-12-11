import { MagicConnectConnector } from '@everipedia/wagmi-magic-connector'
import { Wallet, Chain } from '@rainbow-me/rainbowkit'

const MAGIC_API_KEY = process.env.NEXT_PUBLIC_MAGIC_CONNECT_API_KEY || ''
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || ''
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID

export interface ArgentWalletOptions {
  chains: Chain[]
  isDarkMode: boolean
}

export const MagicWallet = ({
  chains,
  isDarkMode,
}: ArgentWalletOptions): Wallet => ({
  id: 'magic',
  name: 'Magic Connect',
  iconUrl: 'https://dashboard.magic.link/images/logo.svg',
  iconBackground: '#fff',
  createConnector: () => {
    const connector = new MagicConnectConnector({
      chains: chains,
      options: {
        isDarkMode,
        apiKey: MAGIC_API_KEY,
        magicSdkConfiguration: {
          network: {
            rpcUrl: RPC_URL,
            chainId: Number(CHAIN_ID),
          },
        },
      },
    }) as any

    return { connector }
  },
})

export default MagicWallet
