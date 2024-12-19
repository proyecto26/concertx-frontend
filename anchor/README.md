# ConcertX Anchor Program

This is the repository for the ConcertX Anchor program.



## Build the program

```bash
anchor build
```

## Deploy to devnet

```bash
anchor deploy
```

## Run tests

```bash
anchor test
```

## FAQ

- Unable to get latest blockhash. Test validator does not look started:
```bash
brew install gnu-tar
```
and then export the path:
```bash
export PATH="/usr/local/opt/gnu-tar/libexec/gnubin:$PATH"
```

- Error: Your configured rpc port: 8899 is already in use
```bash
killall solana-test-validator
```