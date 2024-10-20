// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import SolanavotingappIDL from '../target/idl/solanavotingapp.json'
import type { Solanavotingapp } from '../target/types/solanavotingapp'

// Re-export the generated IDL and type
export { Solanavotingapp, SolanavotingappIDL }

// The programId is imported from the program IDL.
export const SOLANAVOTINGAPP_PROGRAM_ID = new PublicKey(SolanavotingappIDL.address)

// This is a helper function to get the Solanavotingapp Anchor program.
export function getSolanavotingappProgram(provider: AnchorProvider) {
  return new Program(SolanavotingappIDL as Solanavotingapp, provider)
}

// This is a helper function to get the program ID for the Solanavotingapp program depending on the cluster.
export function getSolanavotingappProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Solanavotingapp program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return SOLANAVOTINGAPP_PROGRAM_ID
  }
}
