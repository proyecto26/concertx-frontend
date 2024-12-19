import { BN } from '@coral-xyz/anchor'
import { PublicKey } from '@solana/web3.js'

export type ConcertX = {
  "version": "0.1.0",
  "name": "concert_x",
  "instructions": [
    {
      "name": "createConcert",
      "accounts": [
        {
          "name": "concert",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "shortDescription",
          "type": "string"
        },
        {
          "name": "goalAmount",
          "type": "u16"
        },
        {
          "name": "ticketPrice",
          "type": "f32"
        },
        {
          "name": "startDate",
          "type": "i64"
        },
        {
          "name": "endDate",
          "type": "i64"
        },
        {
          "name": "maxTokenSupply",
          "type": "u16"
        }
      ]
    },
    {
      "name": "makeContribution",
      "accounts": [
        {
          "name": "concert",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "contribution",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "backer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "clock",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "f32"
        }
      ]
    },
    {
      "name": "updateConcertStatus",
      "accounts": [
        {
          "name": "concert",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newStatus",
          "type": "u8"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "concert",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "pda",
            "type": "publicKey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "shortDescription",
            "type": "string"
          },
          {
            "name": "goalAmount",
            "type": "u16"
          },
          {
            "name": "ticketPrice",
            "type": "f32"
          },
          {
            "name": "currentAmount",
            "type": "f32"
          },
          {
            "name": "startDate",
            "type": "i64"
          },
          {
            "name": "endDate",
            "type": "i64"
          },
          {
            "name": "status",
            "type": "u8"
          },
          {
            "name": "maxTokenSupply",
            "type": "u16"
          },
          {
            "name": "contributors",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "contribution",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "contributor",
            "type": "publicKey"
          },
          {
            "name": "concert",
            "type": "publicKey"
          },
          {
            "name": "amount",
            "type": "f32"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "ConcertNotActive",
      "msg": "The concert is not active."
    },
    {
      "code": 6001,
      "name": "ContributionAmountTooSmall",
      "msg": "Contribution amount is too small"
    },
    {
      "code": 6002,
      "name": "CampaignEnded",
      "msg": "Campaign has ended"
    },
    {
      "code": 6003,
      "name": "CampaignNotStarted",
      "msg": "Campaign has not started yet"
    },
    {
      "code": 6004,
      "name": "Unauthorized",
      "msg": "Unauthorized to perform this action"
    }
  ]
} 