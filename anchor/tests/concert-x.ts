import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { ConcertX } from "../target/types/concert_x";
import { expect } from "chai";
import BN from "bn.js";

describe("concert-x", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.ConcertX as Program<ConcertX>;

  const concert = {
    title: "The big concert",
    desc: "The most amazing concert",
    goalAmount: 1, // 1 SOL
    maxTokenSupply: 100,
    ticketPrice: 0.1, // 0.1 SOL
    startDate: new BN(Math.floor(Date.now() / 1000) - 86400), // Started 24h ago
    endDate: new BN(Math.floor(Date.now() / 1000) + 86400), // Ends in 24h
  };

  let concertPda: anchor.web3.PublicKey;
  let backer: anchor.web3.Keypair;

  before(async () => {
    // Create test concert
    await program.methods
      .createConcert(
        concert.title,
        concert.desc,
        concert.goalAmount,
        concert.ticketPrice,
        concert.startDate,
        concert.endDate,
        concert.maxTokenSupply
      )
      .rpc();

    [concertPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("concertX"),
        Buffer.from(concert.title),
        provider.wallet.publicKey.toBuffer(),
      ],
      program.programId
    );

    // Setup backer with more SOL
    backer = anchor.web3.Keypair.generate();
    const airdropTx = await provider.connection.requestAirdrop(
      backer.publicKey,
      100_000_000_000 // 100 SOL
    );
    await provider.connection.confirmTransaction(airdropTx);
  });

  describe("Concert Creation", () => {
    it("initializes concert with correct values", async () => {
      const account = await program.account.concert.fetch(concertPda);
      expect(account.title).equals(concert.title);
      expect(account.shortDescription).equals(concert.desc);
      expect(account.startDate.eq(concert.startDate)).to.be.true;
      expect(account.endDate.eq(concert.endDate)).to.be.true;
      expect(Math.round(account.ticketPrice * 10) / 10).equals(
        concert.ticketPrice
      );
      expect(account.goalAmount).equals(concert.goalAmount);
      expect(account.maxTokenSupply).equals(concert.maxTokenSupply);
      expect(account.status).equals(0);
      expect(account.contributors.length).equals(0);
      expect(account.currentAmount).equals(0);
    });
  });

  describe("Contributions", () => {
    it("allows minimum contribution at ticket price", async () => {
      const amount = concert.ticketPrice;
      const [contributionPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("contribution"),
          concertPda.toBuffer(),
          backer.publicKey.toBuffer(),
        ],
        program.programId
      );

      await program.methods
        .makeContribution(amount)
        .accounts({
          concert: concertPda,
          contribution: contributionPda,
          backer: backer.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
        })
        .signers([backer])
        .rpc();

      const concertAccount = await program.account.concert.fetch(concertPda);
      expect(Math.abs(concertAccount.currentAmount - amount)).to.be.lessThan(
        0.000001
      );
      expect(concertAccount.contributors).to.deep.include(backer.publicKey);

      const contributionAccount = await program.account.contribution.fetch(
        contributionPda
      );
      expect(Math.abs(contributionAccount.amount - amount)).to.be.lessThan(
        0.000001
      );
      expect(contributionAccount.contributor.toString()).to.equal(
        backer.publicKey.toString()
      );
      expect(contributionAccount.concert.toString()).to.equal(
        concertPda.toString()
      );
    });

    it("allows contribution above goal amount", async () => {
      const amount = 1.5; // 1.5 SOL, above the 1 SOL goal
      const backer2 = anchor.web3.Keypair.generate();

      // Fund the second backer with more SOL
      const airdropTx = await provider.connection.requestAirdrop(
        backer2.publicKey,
        100_000_000_000 // 100 SOL
      );
      await provider.connection.confirmTransaction(airdropTx);

      const [contributionPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("contribution"),
          concertPda.toBuffer(),
          backer2.publicKey.toBuffer(),
        ],
        program.programId
      );

      await program.methods
        .makeContribution(amount)
        .accounts({
          concert: concertPda,
          contribution: contributionPda,
          backer: backer2.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
          clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
        })
        .signers([backer2])
        .rpc();

      const concertAccount = await program.account.concert.fetch(concertPda);
      expect(concertAccount.currentAmount).to.be.greaterThan(
        concert.goalAmount
      );
    });

    it("prevents contribution below ticket price", async () => {
      const amount = concert.ticketPrice - 0.01;
      // Generate a new backer for this test to avoid PDA conflicts
      const newBacker = anchor.web3.Keypair.generate();

      // Fund the new backer
      const airdropTx = await provider.connection.requestAirdrop(
        newBacker.publicKey,
        100_000_000_000 // 100 SOL
      );
      await provider.connection.confirmTransaction(airdropTx);

      const [contributionPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("contribution"),
          concertPda.toBuffer(),
          newBacker.publicKey.toBuffer(),
        ],
        program.programId
      );

      try {
        await program.methods
          .makeContribution(amount)
          .accounts({
            concert: concertPda,
            contribution: contributionPda,
            backer: newBacker.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
          })
          .signers([newBacker])
          .rpc();
        expect.fail("Should have thrown error");
      } catch (error: any) {
        console.log("Full error:", error);
        console.log("Error logs:", error.logs);
        console.log("Error message:", error.message);

        const errorString = error.toString();
        const logsString = error.logs?.join("\n") || "";
        const messageString = error.message || "";

        // Check for any of our expected error conditions
        const hasError =
          errorString.includes("ContributionAmountTooSmall") ||
          errorString.includes("6001") ||
          logsString.includes("ContributionAmountTooSmall") ||
          logsString.includes("6001") ||
          messageString.includes("ContributionAmountTooSmall") ||
          messageString.includes("6001") ||
          messageString.includes("Contribution amount is too small");

        expect(
          hasError,
          `Expected ContributionAmountTooSmall error but got: ${error}`
        ).to.be.true;
      }
    });

    it("prevents contribution to inactive concert", async () => {
      // Create a new concert with status = 2 (cancelled)
      const cancelledConcert = {
        ...concert,
        title: "Cancelled Concert",
      };

      await program.methods
        .createConcert(
          cancelledConcert.title,
          cancelledConcert.desc,
          cancelledConcert.goalAmount,
          cancelledConcert.ticketPrice,
          cancelledConcert.startDate,
          cancelledConcert.endDate,
          cancelledConcert.maxTokenSupply
        )
        .rpc();

      const [cancelledPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("concertX"),
          Buffer.from(cancelledConcert.title),
          provider.wallet.publicKey.toBuffer(),
        ],
        program.programId
      );

      // Set concert status to cancelled (2)
      await program.methods
        .updateConcertStatus(2)
        .accounts({
          concert: cancelledPda,
          authority: provider.wallet.publicKey,
        })
        .rpc();

      const [contributionPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("contribution"),
          cancelledPda.toBuffer(),
          backer.publicKey.toBuffer(),
        ],
        program.programId
      );

      try {
        await program.methods
          .makeContribution(concert.ticketPrice)
          .accounts({
            concert: cancelledPda,
            contribution: contributionPda,
            backer: backer.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
          })
          .signers([backer])
          .rpc();
        expect.fail("Should have thrown error");
      } catch (error: any) {
        expect(error.toString()).to.include("ConcertNotActive");
      }
    });

    it("prevents contribution after end date", async () => {
      // Create a new concert that's already ended
      const endedConcert = {
        ...concert,
        title: "Ended Concert",
        startDate: new BN(Math.floor(Date.now() / 1000) - 172800), // 48h ago
        endDate: new BN(Math.floor(Date.now() / 1000) - 86400), // 24h ago
      };

      await program.methods
        .createConcert(
          endedConcert.title,
          endedConcert.desc,
          endedConcert.goalAmount,
          endedConcert.ticketPrice,
          endedConcert.startDate,
          endedConcert.endDate,
          endedConcert.maxTokenSupply
        )
        .rpc();

      const [endedPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("concertX"),
          Buffer.from(endedConcert.title),
          provider.wallet.publicKey.toBuffer(),
        ],
        program.programId
      );

      const [contributionPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from("contribution"),
          endedPda.toBuffer(),
          backer.publicKey.toBuffer(),
        ],
        program.programId
      );

      try {
        await program.methods
          .makeContribution(concert.ticketPrice)
          .accounts({
            concert: endedPda,
            contribution: contributionPda,
            backer: backer.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
          })
          .signers([backer])
          .rpc();
        expect.fail("Should have thrown error");
      } catch (error) {
        expect(error.message).to.include("Campaign has ended");
      }
    });
  });
});
