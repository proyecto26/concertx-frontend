# Architecture Overview

ConcertX is a decentralized crowdfunding platform for music artists built on Solana blockchain. This document provides an overview of the system architecture.

## System Components

```mermaid
graph TB
    subgraph Frontend
        UI[Web UI - Remix.js]
        Wallet[Wallet Adapter]
        State[State Management]
    end

    subgraph Backend
        Supabase[Supabase DB]
    end

    subgraph Blockchain
        Solana[Solana Network]
        Anchor[Anchor Program]
        NFT[NFT Marketplace]
    end

    UI --> Wallet
    Wallet --> State
    State --> Anchor
    State --> Supabase
    Anchor --> Solana
    NFT --> Solana
```

## Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Wallet
    participant Anchor
    participant Supabase
    participant Solana

    User->>Frontend: Create Concert Campaign
    Frontend->>Wallet: Request Signature
    Wallet->>Frontend: Sign Transaction
    Frontend->>Anchor: Submit Campaign
    Anchor->>Solana: Create Campaign Account
    Frontend->>Supabase: Store Campaign Metadata

    User->>Frontend: Make Contribution
    Frontend->>Wallet: Request Payment
    Wallet->>Frontend: Sign Transaction
    Frontend->>Anchor: Submit Contribution
    Anchor->>Solana: Transfer SOL
    Frontend->>Supabase: Update Stats
```

## User Flow

```mermaid
graph LR
    A[Artist] -->|Creates Campaign| B[Set Campaign Details]
    B --> C[Set Funding Goal]
    C --> D[Set Rewards]
    D --> E[Launch Campaign]

    F[Backer] -->|Views Campaign| G[Select Reward Tier]
    G --> H[Connect Wallet]
    H --> I[Make Contribution]
    I --> J[Receive NFT]

    E -.->|Available for| F
```

## Smart Contract Architecture

```mermaid
classDiagram
    class Concert {
        +Pubkey pda
        +String title
        +String description
        +u16 goal_amount
        +f32 current_amount
        +i64 start_date
        +i64 end_date
        +u8 status
        +create_concert()
        +make_contribution()
    }

    class Contribution {
        +Pubkey contributor
        +f32 amount
        +i64 timestamp
    }

    class Reward {
        +u16 tier
        +String description
        +f32 min_amount
    }

    Concert "1" *-- "many" Contribution
    Concert "1" *-- "many" Reward
```

## Database Schema

```mermaid
erDiagram
    Users ||--o{ Profiles : has
    Users ||--o{ Wallets : owns
    Users ||--o{ Followers : has
    Concerts ||--o{ Contributions : receives
    Concerts ||--o{ Rewards : offers
    Users ||--o{ Concerts : creates

    Users {
        uuid id PK
        string email
        string username
        timestamp created_at
    }

    Profiles {
        uuid user_id FK
        string full_name
        string avatar_url
        text bio
    }

    Wallets {
        uuid user_id FK
        string address PK
        string network
    }

    Concerts {
        uuid id PK
        uuid creator_id FK
        string title
        text description
        decimal goal_amount
        timestamp start_date
        timestamp end_date
    }

    Contributions {
        uuid id PK
        uuid concert_id FK
        uuid contributor_id FK
        decimal amount
        timestamp created_at
    }
```

## Technology Stack

- **Frontend**
  - Remix.js (React Framework)
  - TailwindCSS (Styling)
  - Solana Wallet Adapter
  - Framer Motion (Animations)

- **Backend**
  - Anchor (Solana Smart Contracts)
  - Rust (Smart Contract Language)
  - Supabase (Database & Auth)

- **Blockchain**
  - Solana (Layer 1)
  - Metaplex (NFT Standard)

## Security Considerations

1. **Smart Contract Security**
   - Input validation
   - Access control
   - Secure fund handling
   - Rate limiting

2. **Frontend Security**
   - Wallet connection security
   - Transaction signing
   - Data validation

3. **Database Security**
   - Row Level Security (RLS)
   - API key management
   - Data encryption 