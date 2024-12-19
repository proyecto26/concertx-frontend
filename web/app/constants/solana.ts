import { Cluster, clusterApiUrl, PublicKey } from '@solana/web3.js'

export const SOLANA_NETWORK = 'devnet' as Cluster
export const SOLANA_ENDPOINT = clusterApiUrl(SOLANA_NETWORK)
export const PROGRAM_ID = new PublicKey('EDgnnYxcnjZ1RfkNnMYvqqNs42iFJ7vVCEMzwRw9td8s')