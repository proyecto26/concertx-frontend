import {
  type ComponentType,
  useCallback,
  useMemo,
} from 'react'
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react'
import type {
  Adapter,
  WalletAdapterNetwork,
  WalletError,
} from '@solana/wallet-adapter-base'
import {
  PhantomWalletAdapter,
  BraveWalletAdapter,
} from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'

type ComponentWithSolanaWalletProps = {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  solanaNetwork: WalletAdapterNetwork
};

/**
 * HOC to wrap components with sollana wallet connection
 */
export function withSolanaWalletConnection<T>(
  WrappedComponent: ComponentType<T>
) {
  const ComponentWithSolanaWallet = (props: T & ComponentWithSolanaWalletProps) => {
    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(
      () => clusterApiUrl(props.solanaNetwork),
      [props.solanaNetwork]
    )
    const wallets = useMemo(
      () => [
        /**
         * Select the wallets you wish to support, by instantiating wallet adapters here.
         *
         * Common adapters can be found in the npm package `@solana/wallet-adapter-wallets`.
         * That package supports tree shaking and lazy loading -- only the wallets you import
         * will be compiled into your application, and only the dependencies of wallets that
         * your users connect to will be loaded.
         */
        new PhantomWalletAdapter(),
        new BraveWalletAdapter(),
      ],
      []
    )

    const onError = useCallback((error: WalletError, adapter?: Adapter) => {
      console.error(`Solana wallet: ${error}`, adapter)
    }, [])

    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect onError={onError}>
          <WalletModalProvider>
            <WrappedComponent {...props} />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    )
  }
  return ComponentWithSolanaWallet
}
