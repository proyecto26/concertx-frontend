import { json, type ActionFunctionArgs } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { SystemProgram } from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { getProgram, getConcertPDA } from '~/utils/anchor'
import { BN } from '@coral-xyz/anchor'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const title = formData.get('title') as string
  const shortDescription = formData.get('shortDescription') as string
  const goalAmount = Number(formData.get('goalAmount'))
  const ticketPrice = Number(formData.get('ticketPrice'))
  const startDate = new Date(formData.get('startDate') as string).getTime() / 1000
  const endDate = new Date(formData.get('endDate') as string).getTime() / 1000
  const maxTokenSupply = Number(formData.get('maxTokenSupply'))

  // Validation
  const errors: Record<string, string> = {}
  if (!title) errors.title = 'Title is required'
  if (!shortDescription) errors.shortDescription = 'Description is required'
  if (!goalAmount || goalAmount <= 0) errors.goalAmount = 'Goal amount must be greater than 0'
  if (!ticketPrice || ticketPrice <= 0) errors.ticketPrice = 'Ticket price must be greater than 0'
  if (!startDate) errors.startDate = 'Start date is required'
  if (!endDate) errors.endDate = 'End date is required'
  if (!maxTokenSupply || maxTokenSupply <= 0) errors.maxTokenSupply = 'Max token supply must be greater than 0'

  if (Object.keys(errors).length > 0) {
    return json({ errors })
  }

  return json({ 
    data: {
      title,
      shortDescription,
      goalAmount,
      ticketPrice,
      startDate,
      endDate,
      maxTokenSupply
    }
  })
}

export default function NewConcert() {
  const { connection } = useConnection()
  const wallet = useWallet()
  const actionData = useActionData<typeof action>()
  const [transactionError, setTransactionError] = useState<string | null>(null)

  useEffect(() => {
    const createConcert = async () => {
      if (!actionData?.data || !wallet.publicKey || transactionError) return

      try {
        const program = getProgram(connection, wallet)
        const { 
          title, shortDescription, goalAmount, ticketPrice, 
          startDate, endDate, maxTokenSupply 
        } = actionData.data

        const concertPDA = getConcertPDA(title, wallet.publicKey)

        await program.methods
          .createConcert(
            title,
            shortDescription,
            goalAmount,
            ticketPrice,
            new BN(startDate),
            new BN(endDate),
            maxTokenSupply
          )
          .accounts({
            concert: concertPDA,
            initializer: wallet.publicKey,
            systemProgram: SystemProgram.programId,
          })
          .rpc()

      } catch (error) {
        console.error('Error creating concert:', error)
        setTransactionError(error instanceof Error ? error.message : 'Failed to create concert')
      }
    }

    createConcert()
  }, [actionData?.data, wallet.publicKey, connection])

  if (!wallet.connected) {
    return <div className="p-4">Please connect your wallet to create a concert</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Concert</h1>
      
      {transactionError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {transactionError}
        </div>
      )}

      <Form method="post" className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {actionData?.errors?.title && (
            <p className="text-red-500 text-sm mt-1">{actionData.errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea
            name="shortDescription"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {actionData?.errors?.shortDescription && (
            <p className="text-red-500 text-sm mt-1">{actionData.errors.shortDescription}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Goal Amount (SOL)</label>
          <input
            type="number"
            name="goalAmount"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {actionData?.errors?.goalAmount && (
            <p className="text-red-500 text-sm mt-1">{actionData.errors.goalAmount}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ticket Price (SOL)</label>
          <input
            type="number"
            name="ticketPrice"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {actionData?.errors?.ticketPrice && (
            <p className="text-red-500 text-sm mt-1">{actionData.errors.ticketPrice}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="datetime-local"
            name="startDate"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {actionData?.errors?.startDate && (
            <p className="text-red-500 text-sm mt-1">{actionData.errors.startDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="datetime-local"
            name="endDate"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {actionData?.errors?.endDate && (
            <p className="text-red-500 text-sm mt-1">{actionData.errors.endDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Max Token Supply</label>
          <input
            type="number"
            name="maxTokenSupply"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {actionData?.errors?.maxTokenSupply && (
            <p className="text-red-500 text-sm mt-1">{actionData.errors.maxTokenSupply}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Concert
        </button>
      </Form>
    </div>
  )
} 