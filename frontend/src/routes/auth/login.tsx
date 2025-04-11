import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { LucideArrowLeft, LucideLoader2 } from 'lucide-react'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

const LOGIN_MUTATION = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`

function RouteComponent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginUser, result] = useMutation(LOGIN_MUTATION)
  const router = useRouter()

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await loginUser({ variables: { username, password } })
    const { token, user } = res.data.loginUser
    localStorage.setItem('authToken', token)
    localStorage.setItem('userId', user.id)

    router.navigate({ to: '/' })
  }
  return (
    <div className="bg-slate-100 h-svh flex flex-col items-center justify-center p-2">
      <Card className="w-full md:w-2/6">
        <CardHeader>
          <Link to="/">
            <LucideArrowLeft />
          </Link>
          <h1 className="text-center text-2xl text-slate-700 font-semibold">
            Login
          </h1>
          {result.error ? (
            <span className="bg-red-50 w-full border border-red-100 rounded-md p-2 text-center text-red-500">
              Could not login
            </span>
          ) : null}
        </CardHeader>
        <CardContent>
          <form onSubmit={login} className="w-full flex flex-col gap-3">
            <div className="flex flex-col">
              <label className="text-slate-500">username</label>
              <Input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@yeff"
                className="p-2 text-lg border border-slate-200 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-slate-500">password</label>
              <Input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="supersecrepassword"
                className="p-2 text-lg border border-slate-200 rounded-lg"
              />
            </div>
            <span className="inline-flex gap-2 text-sm text-slate-700">
              Not yet registered?
              <Link
                to="/auth/register"
                className="text-sky-600 hover:underline transition-all"
              >
                Register
              </Link>
            </span>
            <Button
              type="submit"
              disabled={result.loading}
              className="bg-sky-500 p-5 rounded-lg text-lg mt-3 font-semibold text-slate-100 hover:bg-sky-500/80 transition-all"
            >
              {result.loading ? (
                <>
                  <LucideLoader2 className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
