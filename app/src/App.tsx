import {
    useWaitForTransactionReceipt,
    useWriteContract,
    useReadContracts,
    useBlockNumber,
} from 'wagmi'
import { wagmiContractConfig } from './contracts'
import "./index.css"
import { useEffect } from 'react'

function App() {
    const ropePosition = 0
    const team1Score = 0
    const team2Score = 0

    const { data: hash, writeContract } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    const {
        data,
        error,
        isPending,
        refetch
    } = useReadContracts({
        contracts: [{
            ...wagmiContractConfig,
            functionName: 'ropePosition',
        }, {
            ...wagmiContractConfig,
            functionName: 'maxScoreDifference',
        }, {
            ...wagmiContractConfig,
            functionName: 'team1Score',
        }, {
            ...wagmiContractConfig,
            functionName: 'team2Score',
        }, {
            ...wagmiContractConfig,
            functionName: 'getWinStatus',
        },]
    })

    const { data: blockNumber } = useBlockNumber({ watch: true })

    useEffect(() => {
        refetch()
    }, [blockNumber])

    const [ropePositionOnChain, maxScoreDifferenceOnChain, team1ScoreOnChain, team2ScoreOnChain, winStatusOnChain] = data || []

    if (isPending) return (
        <div className="tug-of-war-container">
            <div className="status-message pending">
                <span className="loading-spinner">⏳</span> Loading game state...
            </div>
        </div>
    )

    if (error) {
        return (
            <div className="tug-of-war-container">
                <div className="status-message error">
                    ⚠️ Error loading game state
                </div>
            </div>
        )
    }

    const pullRope = (isTeam1: boolean) => {
        writeContract({
            address: wagmiContractConfig.address,
            abi: wagmiContractConfig.abi,
            functionName: 'pull',
            args: [isTeam1],
        })
    }

    const flagOffset = (ropePositionOnChain?.result && maxScoreDifferenceOnChain?.result)
        ? Number(ropePositionOnChain.result) * 70 / Number(maxScoreDifferenceOnChain.result) * 5
        : ropePosition * 5

    return (
        <div className="tug-of-war-container">
            <h1 className="tug-of-war-title">⚔️ Tug of War ⚔️</h1>

            <div className="tug-of-war-score-board">
                <div className="tug-of-war-team1-score">
                    🏆 Team 1: {team1ScoreOnChain?.result ?? team1Score}
                </div>
                <div className="tug-of-war-team2-score">
                    🏆 Team 2: {team2ScoreOnChain?.result ?? team2Score}
                </div>
            </div>

            {(winStatusOnChain && Number(winStatusOnChain.result) === 1) &&
                <h2 className="tug-of-war-title win-message">🎉 Team 1 Wins! 🎉</h2>
            }
            {(winStatusOnChain && Number(winStatusOnChain.result) === 2) &&
                <h2 className="tug-of-war-title win-message">🎉 Team 2 Wins! 🎉</h2>
            }

            <div className="tug-of-war-field">
                <div className="tug-of-war-team1">👥 Team 1</div>
                <div
                    className="tug-of-war-rope-line"
                    style={{
                        "--flag-offset": `${flagOffset}%`
                    } as React.CSSProperties & { '--flag-offset': string }}
                >
                    <div className="tug-of-war-rope-center"></div>
                    <div className="tug-of-war-flag">
                        <div className="tug-of-war-flag-triangle"></div>
                    </div>
                </div>
                <div className="tug-of-war-team2">👥 Team 2</div>
            </div>

            <div className="tug-of-war-controls">
                <button
                    className="tug-of-war-pull-button"
                    onClick={() => pullRope(true)}
                    disabled={isConfirming || Number(winStatusOnChain?.result) > 0}
                >
                    🎯 Cheer for Team 1
                </button>
                <button
                    className="tug-of-war-pull-button"
                    onClick={() => pullRope(false)}
                    disabled={isConfirming || Number(winStatusOnChain?.result) > 0}
                >
                    🎯 Cheer for Team 2
                </button>
            </div>

            <div className="chain-info">
                <p>
                    📊 Game Stats: Position ({ropePositionOnChain?.result ?? 0}) |
                    Team 1 ({team1ScoreOnChain?.result ?? 0}) |
                    Team 2 ({team2ScoreOnChain?.result ?? 0})
                </p>

                {isPending &&
                    <div className="status-message pending">
                        ⏳ Transaction Pending...
                    </div>
                }

                {hash && (
                    <div className="transaction-hash">
                        🔍 View on Explorer:
                        <a
                            href={`https://testnet.monadexplorer.com/tx/${hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {hash.substring(0, 6) + "..." + hash.substring(hash.length - 4)}
                        </a>
                    </div>
                )}

                {isConfirming &&
                    <div className="status-message confirming">
                        ⚡ Confirming Transaction...
                    </div>
                }

                {isConfirmed &&
                    <div className="status-message confirmed">
                        ✅ Transaction Confirmed!
                    </div>
                }
            </div>
        </div>
    )
}

export default App