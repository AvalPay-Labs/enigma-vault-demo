import { useState } from 'react'
import { useLogin } from '@/hooks/useLogin'
import { useProfile } from '@/hooks/useProfile'

export default function AuthExample() {
  const [token, setToken] = useState<string | undefined>()
  const { mutate: doLogin, data, isPending, error } = useLogin()
  const { data: profile } = useProfile(token)

  return (
    <div className="p-4 space-y-2 text-sm">
      <button
        className="px-3 py-1 rounded bg-black text-white"
        onClick={() =>
          doLogin({ email: 'test@example.com', password: 'secret' }, {
            onSuccess: (r) => setToken(r.data.token),
          })
        }
        disabled={isPending}
      >Login</button>
      {error && <div className="text-red-600">{error.message}</div>}
      {data && <pre className="bg-gray-100 p-2 overflow-auto">{JSON.stringify(data, null, 2)}</pre>}
      {profile && <pre className="bg-gray-100 p-2 overflow-auto">{JSON.stringify(profile, null, 2)}</pre>}
    </div>
  )
}

