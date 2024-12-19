import { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'
import { PROGRAM_ID } from '~/constants'
import type { ConcertX } from '~/types/anchor'

export interface Concert {
  publicKey: PublicKey
  title: string
  shortDescription: string
  goalAmount: number
  ticketPrice: number
  startDate: Date
  endDate: Date
  maxTokenSupply: number
  status: 'active' | 'completed' | 'cancelled'
  currentAmount: number
  contributors: PublicKey[]
}

export const useConcerts = () => {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [concerts, setConcerts] = useState<Concert[]>([])

  const fetchConcerts = async () => {
    if (!publicKey) return

    try {
      setLoading(true)
      setError(null)

      // Create provider
      const provider = new anchor.AnchorProvider(
        connection,
        { publicKey } as any,
        { commitment: 'confirmed' }
      )

      // Create program
      const program = new Program(
        require('~/idl/concert_x.json'),
        PROGRAM_ID,
        provider
      ) as Program<ConcertX>

      // Get all concert accounts
      const concertAccounts = await program.account.concert.all()

      // Transform accounts to our Concert type
      const transformedConcerts = concertAccounts.map(account => ({
        publicKey: account.publicKey,
        title: account.account.title,
        shortDescription: account.account.shortDescription,
        goalAmount: account.account.goalAmount,
        ticketPrice: account.account.ticketPrice,
        startDate: new Date(account.account.startDate.toNumber() * 1000),
        endDate: new Date(account.account.endDate.toNumber() * 1000),
        maxTokenSupply: account.account.maxTokenSupply,
        status: ['active', 'completed', 'cancelled'][account.account.status] as Concert['status'],
        currentAmount: account.account.currentAmount,
        contributors: account.account.contributors
      }))

      setConcerts(transformedConcerts)
    } catch (err) {
      console.error('Error fetching concerts:', err)
      setError(err instanceof Error ? err.message : 'Error fetching concerts')
    } finally {
      setLoading(false)
    }
  }

  const getConcertPDA = async (title: string, creator: PublicKey) => {
    const [pda] = await PublicKey.findProgramAddressSync(
      [
        Buffer.from('concertX'),
        Buffer.from(title),
        creator.toBuffer()
      ],
      PROGRAM_ID
    )
    return pda
  }

  useEffect(() => {
    fetchConcerts()
  }, [publicKey, connection])

  return {
    concerts,
    loading,
    error,
    fetchConcerts,
    getConcertPDA
  }
} 