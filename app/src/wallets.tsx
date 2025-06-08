import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { monadTestnet } from 'wagmi/chains'

export function Wallets() {
  const account = useAccount()
  const { connectors, connect, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()

  const handleConnect = async (connector: any) => {
    try {
      connect({
        connector,
        chainId: monadTestnet.id
      })
    } catch (err) {
      console.error('Connection error:', err)
    }
  }

  const handleSwitchChain = async () => {
    try {
      await switchChain({ chainId: monadTestnet.id })
    } catch (err) {
      console.error('Switch chain error:', err)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return '🟢'
      case 'connecting':
        return '⏳'
      case 'disconnected':
        return '⭕'
      case 'error':
        return '⛔'
      default:
        return '⭕'
    }
  }

  const getConnectorIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'metamask':
        return '🦊'
      case 'walletconnect':
        return '🔗'
      case 'coinbase wallet':
        return '💰'
      default:
        return '👛'
    }
  }

  return (
    <div className="wallet-container">
      <div className="wallet-section">
        <h2 className="wallet-title">
          👛 Wallet Connection
        </h2>
        <div className="wallet-content">
          <div className="wallet-info">
            <div>
              Status: {getStatusIcon(account.status)}
              <span className={`wallet-status ${account.status}`}>
                {account.status.charAt(0).toUpperCase() + account.status.slice(1)}
              </span>
            </div>

            {account.chainId && (
              <div>
                Network: 🌐
                <span className="wallet-chainid">
                  {account.chainId === monadTestnet.id ? 'Monad Testnet' : account.chainId}
                </span>
                {account.chainId !== monadTestnet.id && (
                  <button
                    onClick={handleSwitchChain}
                    className="wallet-button switch"
                  >
                    🔄 Switch to Monad
                  </button>
                )}
              </div>
            )}

            {account.address && (
              <div>
                Address: 📝
                <span className="wallet-address" title={account.address}>
                  {account.address.substring(0, 6)}...{account.address.substring(account.address.length - 4)}
                </span>
              </div>
            )}
          </div>

          <div className="wallet-actions">
            {account.status === 'connected' ? (
              <button
                className="wallet-button disconnect"
                onClick={() => disconnect()}
              >
                🔌 Disconnect
              </button>
            ) : (
              <div className="wallet-connectors">
                {connectors.map((connector) => (
                  <button
                    key={connector.uid}
                    onClick={() => handleConnect(connector)}
                    className="wallet-button connect"
                  >
                    {getConnectorIcon(connector.name)} {connector.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="wallet-error">
            ⚠️ {error.message}
          </div>
        )}
      </div>
    </div>
  )
}