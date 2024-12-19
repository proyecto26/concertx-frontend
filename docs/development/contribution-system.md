# Contribution System

## Overview
The contribution system allows backers to pledge SOL to concert campaigns. Each contribution is tracked in a separate on-chain account and updates the campaign's total raised amount.

## Technical Specifications

### Contribution Account Structure
```rust
pub struct Contribution {
    pub contributor: Pubkey,    // The wallet address of the contributor
    pub concert: Pubkey,        // The concert campaign being contributed to
    pub amount: f32,            // Amount contributed in SOL
    pub timestamp: i64,         // Unix timestamp of the contribution
}
```

### Business Rules

#### Contribution Validation
1. **Campaign Status**
   - Contributions are only allowed when campaign is active (status = 0)
   - Contributions are allowed before the official start date
   - Contributions are NOT allowed after the campaign end date

2. **Contribution Amounts**
   - Minimum contribution amount = ticket price
   - No maximum contribution limit per transaction
   - No limit on total campaign contributions (can exceed goal)
   - Decimal amounts are allowed (handled in lamports)

3. **Multiple Contributions**
   - Multiple contributions from the same backer are allowed
   - Each contribution creates a new Contribution account
   - No cool-down period between contributions

4. **Campaign Deadline**
   - Contributions are blocked after end_date timestamp
   - No grace period after deadline

### Error Conditions
```rust
pub enum ErrorCode {
    ConcertNotActive,           // Campaign status is not 0 (active)
    CampaignEnded,             // Current time is after end_date
    ContributionAmountTooSmall, // Amount is less than ticket_price
    TransferFailed,            // SOL transfer failed
}
```

### Implementation Details

#### PDA Seeds for Contribution Account
```rust
[
    b"contribution",
    concert_pubkey.as_ref(),
    backer_pubkey.as_ref(),
    counter.to_le_bytes().as_ref(),  // To allow multiple contributions
]
```

#### SOL Transfer
- Amounts are converted to lamports (1 SOL = 1,000,000,000 lamports)
- Transfers are made directly to the concert's escrow account
- Transfer fees are paid by the backer

## Testing Strategy

### Unit Tests
1. Basic contribution flow
   - Valid contribution updates all states correctly
   - Contribution account stores correct data
   - Campaign totals are updated accurately

2. Validation rules
   - Contributions after end date are rejected
   - Contributions below ticket price are rejected
   - Contributions to inactive campaigns are rejected

3. Edge cases
   - Multiple contributions from same backer
   - Decimal amount handling
   - Contribution exactly at deadline

### Integration Tests
1. Full contribution flow with SOL transfers
2. Multiple backers contributing to same campaign
3. Campaign state after multiple contributions

## Frontend Integration

### Required Frontend Validations
1. Check wallet connection
2. Check sufficient SOL balance
3. Validate minimum contribution amount
4. Check campaign status and deadline

### Error Handling
1. Clear error messages for each validation failure
2. Proper handling of transaction failures
3. UI feedback during transaction processing

## Security Considerations

1. **Account Validation**
   - Verify all account constraints
   - Validate PDAs and seeds
   - Check account ownership

2. **Amount Handling**
   - Safe conversion between SOL and lamports
   - Prevent integer overflow
   - Validate all numeric inputs

3. **Access Control**
   - Verify signer permissions
   - Validate campaign status
   - Check temporal constraints 