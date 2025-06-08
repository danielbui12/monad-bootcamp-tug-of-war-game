import { defineChain } from 'viem'
import { http, createConfig } from 'wagmi'
import { monadTestnet } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'

export const localnet = defineChain({
  id: 31_337,
  name: 'Localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Monad',
    symbol: 'MON',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
})

export const config = createConfig({
  chains: [monadTestnet, localnet],
  connectors: [
    metaMask(),
  ],
  transports: {
    [monadTestnet.id]: http(),
    [localnet.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
