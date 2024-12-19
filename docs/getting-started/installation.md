# Installation Guide

This guide will help you set up your development environment for ConcertX.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [Rust](https://rustup.rs/)
- [Git](https://git-scm.com/)
- [Solana CLI Tools](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor CLI](https://www.anchor-lang.com/)

## Installing Dependencies

### 1. Solana CLI Tools

```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.17.0/install)"
```

Add Solana to your PATH:
```bash
export PATH="/home/YOUR_USER/.local/share/solana/install/active_release/bin:$PATH"
```

### 2. Rust and Cargo

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### 3. Anchor CLI

```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest
```

### 4. Project Dependencies

Clone the repository:
```bash
git clone https://github.com/proyecto26/concertx-frontend.git
cd concertx-frontend
```

Install Web Dependencies:
```bash
cd web
npm install
```

Install Anchor Dependencies:
```bash
cd ../anchor
anchor build
```

## Setting up Development Environment

### 1. Solana Configuration

Set up your Solana configuration for development:
```bash
solana config set --url devnet
solana-keygen new
```

### 2. Environment Variables

Create a `.env` file in the `web` directory:
```bash
cp .env.example .env
```

Fill in the required environment variables:
```env
SOLANA_NETWORK=devnet
SOLANA_RPC_HOST=https://api.devnet.solana.com
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Verifying Installation

To verify your installation:

1. Check Solana CLI:
```bash
solana --version
```

2. Check Anchor CLI:
```bash
anchor --version
```

3. Check Node.js:
```bash
node --version
```

You're now ready to start developing with ConcertX! See the [Quick Start Guide](./quick-start.md) for next steps. 