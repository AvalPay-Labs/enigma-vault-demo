import { useState } from 'react'
import { mintStandaloneTokens } from '@/services/standalone'

export default function StandaloneMintExample() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const onMint = async () => {
    setPending(true)
    setError(null)
    try {
      const res = await mintStandaloneTokens({ ownerWalletNumber: 1, userWalletNumber: 2, amount: 10 })
      setData(res)
    } catch (e: any) {
      setError(e?.message || 'Error')
    } finally {
      setPending(false)
    }
  }
  return (
    <div className="p-4 space-y-2 text-sm">
      <button className="px-3 py-1 rounded bg-black text-white" disabled={pending} onClick={onMint}>Mint 10</button>
      {error && <div className="text-red-600">{error}</div>}
      {data && <pre className="bg-gray-100 p-2 overflow-auto">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

