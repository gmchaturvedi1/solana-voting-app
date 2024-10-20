import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair} from '@solana/web3.js'
import {Solanavotingapp} from '../target/types/solanavotingapp'

describe('solanavotingapp', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.Solanavotingapp as Program<Solanavotingapp>

  const solanavotingappKeypair = Keypair.generate()

  it('Initialize Solanavotingapp', async () => {
    await program.methods
      .initialize()
      .accounts({
        solanavotingapp: solanavotingappKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([solanavotingappKeypair])
      .rpc()

    const currentCount = await program.account.solanavotingapp.fetch(solanavotingappKeypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment Solanavotingapp', async () => {
    await program.methods.increment().accounts({ solanavotingapp: solanavotingappKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanavotingapp.fetch(solanavotingappKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment Solanavotingapp Again', async () => {
    await program.methods.increment().accounts({ solanavotingapp: solanavotingappKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanavotingapp.fetch(solanavotingappKeypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement Solanavotingapp', async () => {
    await program.methods.decrement().accounts({ solanavotingapp: solanavotingappKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanavotingapp.fetch(solanavotingappKeypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set solanavotingapp value', async () => {
    await program.methods.set(42).accounts({ solanavotingapp: solanavotingappKeypair.publicKey }).rpc()

    const currentCount = await program.account.solanavotingapp.fetch(solanavotingappKeypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the solanavotingapp account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        solanavotingapp: solanavotingappKeypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.solanavotingapp.fetchNullable(solanavotingappKeypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
