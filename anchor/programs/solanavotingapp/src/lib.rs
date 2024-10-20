#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

#[program]
pub mod solanavotingapp {
    use super::*;

  pub fn close(_ctx: Context<CloseSolanavotingapp>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanavotingapp.count = ctx.accounts.solanavotingapp.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.solanavotingapp.count = ctx.accounts.solanavotingapp.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeSolanavotingapp>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.solanavotingapp.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeSolanavotingapp<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Solanavotingapp::INIT_SPACE,
  payer = payer
  )]
  pub solanavotingapp: Account<'info, Solanavotingapp>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseSolanavotingapp<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub solanavotingapp: Account<'info, Solanavotingapp>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub solanavotingapp: Account<'info, Solanavotingapp>,
}

#[account]
#[derive(InitSpace)]
pub struct Solanavotingapp {
  count: u8,
}
