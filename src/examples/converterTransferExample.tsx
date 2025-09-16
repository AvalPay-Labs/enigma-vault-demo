import { useConverterTransfer } from '@/hooks/useConverterTransfer'

export default function ConverterTransferExample() {
  const { mutate: doTransfer, data, isPending, error } = useConverterTransfer()
  return (
    <div className="p-4 space-y-2 text-sm">
      <button
        className="px-3 py-1 rounded bg-black text-white"
        onClick={() => doTransfer({ amount: 10, receiverWalletNumber: 2 })}
        disabled={isPending}
      >Transfer 10 to wallet 2</button>
      {error && <div className="text-red-600">{error.message}</div>}
      {data && <pre className="bg-gray-100 p-2 overflow-auto">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

