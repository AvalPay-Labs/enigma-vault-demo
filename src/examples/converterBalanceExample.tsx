import { useConverterBalance } from '@/hooks/useConverterBalance'

export default function ConverterBalanceExample() {
  const { data, isLoading, error } = useConverterBalance(1)
  return (
    <div className="p-4 space-y-2 text-sm">
      {isLoading && <div>Cargando balance...</div>}
      {error && <div className="text-red-600">{(error as any)?.message || 'Error'}</div>}
      {data && <pre className="bg-gray-100 p-2 overflow-auto">{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

