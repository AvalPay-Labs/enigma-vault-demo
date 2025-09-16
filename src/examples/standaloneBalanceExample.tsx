import { useEffect, useState } from 'react'
import { getStandaloneBalance } from '@/services/standalone'

export default function StandaloneBalanceExample() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    getStandaloneBalance(1).then(setData).catch(e => setError(e.message))
  }, [])
  return (
    <div className="p-4 space-y-2 text-sm">
      {error && <div className="text-red-600">{error}</div>}
      {data && <pre className="bg-gray-100 p-2 overflow-auto">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

