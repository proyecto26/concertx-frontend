use anchor_lang::prelude::*;

// Program ID for the ConcertX smart contract
declare_id!("Fh63wv5yhjeNPhyd7jN4ZAhAqLjngHxr8fhV9u7F21fu");

// Main program module containing all instruction handlers
#[program]
pub mod concert_x {
    use super::*;

    pub fn create_concert(
    // Creates a new concert crowdfunding campaign
    //
    // # Arguments
    // * `ctx` - The context of the instruction
    // * `title` - The title of the concert campaign
    // * `short_description` - Brief description of the concert
    // * `goal_amount` - Target funding amount in SOL
    // * `start_date` - Unix timestamp for campaign start
    // * `end_date` - Unix timestamp for campaign end
        ctx: Context<CreateConcert>,
        title: String,
        short_description: String,
        goal_amount: u16,
        ticket_price: f32,
        start_date: i64,
        end_date: i64,
        max_token_supply: u16
    ) -> Result<()> {
        msg!("Creating new concert campaign");
        let concert = &mut ctx.accounts.concert;
        concert.pda = ctx.accounts.initializer.key();
        concert.title = title;
        concert.short_description = short_description;
        concert.goal_amount = goal_amount;
        concert.current_amount = 0.0;
        concert.ticket_price = ticket_price;
        concert.start_date = start_date;
        concert.end_date = end_date;
        concert.max_token_supply = max_token_supply;
        concert.status = 0;        
        Ok(())
    }

    pub fn update_concert_status(ctx: Context<UpdateConcertStatus>, new_status: u8) -> Result<()> {
        require!(
            ctx.accounts.authority.key() == ctx.accounts.concert.pda,
            ErrorCode::Unauthorized
        );

        let concert = &mut ctx.accounts.concert;
        concert.status = new_status;
        
        Ok(())
    }

    pub fn make_contribution(ctx: Context<MakeContribution>, amount: f32) -> Result<()> {
        let clock = Clock::get()?;
        
        // Validate campaign is still active
        require!(
            ctx.accounts.concert.status == 0,
            ErrorCode::ConcertNotActive
        );
        
        // Validate campaign hasn't ended
        require!(
            clock.unix_timestamp <= ctx.accounts.concert.end_date,
            ErrorCode::CampaignEnded
        );
        
        // Validate contribution amount
        require_gte!(
            amount,
            ctx.accounts.concert.ticket_price,
            ErrorCode::ContributionAmountTooSmall
        );
        
        // Convert amount to lamports (1 SOL = 1,000,000,000 lamports)
        let lamports = (amount * 1_000_000_000.0) as u64;
        
        // Create contribution record
        let contribution = &mut ctx.accounts.contribution;
        contribution.contributor = ctx.accounts.backer.key();
        contribution.concert = ctx.accounts.concert.key();
        contribution.amount = amount;
        contribution.timestamp = clock.unix_timestamp;
        
        // Update concert state
        let concert = &mut ctx.accounts.concert;
        concert.current_amount += amount;
        concert.contributors.push(ctx.accounts.backer.key());
        
        // Transfer SOL using system program
        anchor_lang::solana_program::program::invoke(
            &anchor_lang::solana_program::system_instruction::transfer(
                &ctx.accounts.backer.key(),
                &ctx.accounts.concert.key(),
                lamports
            ),
            &[
                ctx.accounts.backer.to_account_info(),
                ctx.accounts.concert.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;
        
        Ok(())
    }
}

/// Account validation struct for creating a new concert
#[derive(Accounts)]
#[instruction(title:String)]
pub struct CreateConcert<'info> {
    /// The concert account to be created
    #[account(
        init,
        seeds = [b"concertX", title.as_bytes(), initializer.key().as_ref()],
        bump,
        payer = initializer,
        space = DISCRIMINATOR + Concert::MAX_SIZE
    )]
    pub concert: Account<'info, Concert>,
    /// The account creating the concert (pays for rent)
    #[account(mut)]
    pub initializer: Signer<'info>,
    /// The system program
    pub system_program: Program<'info, System>,
}

/// Account validation struct for making contributions
#[derive(Accounts)]
pub struct MakeContribution<'info> {
    #[account(mut)]
    pub concert: Account<'info, Concert>,
    
    #[account(
        init,
        payer = backer,
        space = 8 + 32 + 32 + 4 + 8,
        seeds = [
            b"contribution",
            concert.key().as_ref(),
            backer.key().as_ref(),
        ],
        bump
    )]
    pub contribution: Account<'info, Contribution>,
    
    #[account(mut)]
    pub backer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct UpdateConcertStatus<'info> {
    #[account(mut)]
    pub concert: Account<'info, Concert>,
    pub authority: Signer<'info>,
}

/// Constants and size calculations for the Concert account
impl Concert {
    /// Maximum length allowed for concert title
    pub const MAX_TITLE_LEN: usize = 20;
    /// Maximum length allowed for concert description
    pub const MAX_DESC_LEN: usize = 200;
    /// Total size of the Concert account struct in bytes
    pub const MAX_SIZE: usize = 32                          // PDA (Pubkey)
                            + 4 + Concert::MAX_TITLE_LEN    // title (length prefix + chars)
                            + 4 + Concert::MAX_DESC_LEN     // short_description (length prefix + chars)
                            + 2                             // goal_amount
                            + 4                             // ticket_price
                            + 4                             // current_amount
                            + 8                             // start_date
                            + 8                             // end_date
                            + 1;                            // status
}

/// Main account structure for storing concert campaign data
#[account]
#[derive(InitSpace)]
pub struct Concert {
    /// Concert PDA, serves as escrow between artist and backer
    pub pda: Pubkey,
    /// The title of the concert campaign
    #[max_len(20)]                    
    pub title: String,
    /// Brief description of the concert
    #[max_len(100)]
    pub short_description: String,
    /// Target funding amount in SOL
    pub goal_amount: u16,
    pub ticket_price: f32,
    /// Amount of SOL currently raised
    pub current_amount: f32,     
    /// Unix timestamps when the campaign starts
    pub start_date: i64,      
    /// Unix timestamps when the campaign ends
    pub end_date: i64,
    /// 0 = active, 1 = completed, 2 = cancelled
    pub status: u8,
    /// Maximum number of tokens that can be minted
    pub max_token_supply: u16,
    /// Concert contributors
    #[max_len(100)]
    pub contributors: Vec<Pubkey>,
}

/// Size of the account discriminator
const DISCRIMINATOR: usize = 8;

/// Custom error codes for the program
#[error_code]
pub enum ErrorCode {
    /// Returned when trying to interact with an inactive concert
    #[msg("The concert is not active.")]
    ConcertNotActive,
    /// Returned when contribution would exceed the funding goal
    #[msg("The funding goal has been exceeded.")]
    GoalExceeded,
    /// Returned when a calculation would cause an overflow
    #[msg("Math overflow.")]
    Overflow,
    /// Returned when a lamport transfer fails
    #[msg("Transfer error")]
    TransferFailed,
    #[msg("Contribution amount is too small")]
    ContributionAmountTooSmall,
    #[msg("Campaign has ended")]
    CampaignEnded,
    #[msg("Campaign has not started yet")]
    CampaignNotStarted,
    #[msg("Unauthorized to perform this action")]
    Unauthorized,
}

#[account]
#[derive(InitSpace)]
pub struct Contribution {
    pub contributor: Pubkey,
    pub concert: Pubkey,
    pub amount: f32,
    pub timestamp: i64,
}
