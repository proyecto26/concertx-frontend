import { Program, AnchorProvider } from '@coral-xyz/anchor'
import { Connection, PublicKey } from '@solana/web3.js'
import type { ConcertX } from '~/types/anchor'
import { PROGRAM_ID } from '~/constants'

export const getProgram = (connection: Connection, wallet: { publicKey: PublicKey }) => {
  const provider = new AnchorProvider(
    connection,
    wallet as any,
    { commitment: 'confirmed' }
  )

  return new Program(
    require('~/idl/concert_x.json'),
    PROGRAM_ID,
    provider
  ) as Program<ConcertX>
}

export const getConcertPDA = (title: string, creator: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('concertX'),
      Buffer.from(title),
      creator.toBuffer()
    ],
    PROGRAM_ID
  )
  return pda
}

export const getContributionPDA = (concert: PublicKey, contributor: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from('contribution'),
      concert.toBuffer(),
      contributor.toBuffer()
    ],
    PROGRAM_ID
  )
  return pda
}

export const formatSol = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits: 1,
    maximumFractionDigits: 9,
  }).format(amount)
}

export const getConcertStatus = (status: number): 'active' | 'completed' | 'cancelled' => {
  return ['active', 'completed', 'cancelled'][status] as 'active' | 'completed' | 'cancelled'
} 