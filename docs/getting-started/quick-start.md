# Quick Start Guide

This guide will help you get started with ConcertX development.

## Running the Projects

### 1. Start the Anchor Program

First, ensure you're in the `anchor` directory:
```bash
cd anchor
```

Build the program:
```bash
anchor build
```

Deploy to devnet:
```bash
anchor deploy
```

Run tests:
```bash
anchor test
```

### 2. Start the Web Frontend

In a new terminal, navigate to the `web` directory:
```bash
cd web
```

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Development Workflow

### 1. Anchor Program Development

The Anchor program is located in `anchor/programs/concert-x/src/lib.rs`. When making changes:

1. Edit the program code
2. Build with `anchor build`
3. Run tests with `anchor test`
4. Deploy changes with `anchor deploy`

### 2. Web Frontend Development

The web frontend is a Remix.js application. Key directories:

- `web/app/` - Main application code
- `web/app/components/` - React components
- `web/app/hooks/` - Custom React hooks
- `web/app/pages/` - Page components
- `web/app/utils/` - Utility functions

When making changes:

1. The development server will automatically reload
2. Check the console for any errors
3. Use the browser's developer tools for debugging

### 3. Database Development

We use Supabase for our database. To work with the database:

1. Access your Supabase project dashboard
2. Use the SQL editor for database changes
3. Update types in `web/app/types/supabase.ts`

## Common Commands

### Anchor Commands

```bash
# Build the program
anchor build

# Run tests
anchor test

# Deploy to devnet
anchor deploy

# Build and deploy in one command
anchor build && anchor deploy
```

### Web Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run linter
npm run lint
```

## Next Steps

- Read the [Architecture Overview](../architecture/overview.md)
- Explore the [Anchor Program Documentation](../development/anchor-program.md)
- Check out the [Web Frontend Documentation](../development/web-frontend.md)
- Review our [ROADMAP](../ROADMAP.md) 