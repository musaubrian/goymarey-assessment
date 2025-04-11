import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { LucideArrowLeft, LucideLoader2 } from 'lucide-react'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

const REGISTER_MUTATION = gql`
  mutation RegisterUser(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createUser(email: $email, username: $username, password: $password) {
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [createUser, result] = useMutation(REGISTER_MUTATION)
  const router = useRouter()

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await createUser({ variables: { email, username, password } })
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
            Register
          </h1>
          {result.error ? (
            <span className="bg-red-50 w-full border border-red-100 rounded-md p-2 text-center text-red-500">
              Could not complete Registration
            </span>
          ) : null}
        </CardHeader>
        <CardContent>
          <form onSubmit={register} className="w-full flex flex-col gap-3">
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
              <label className="text-slate-500">email</label>
              <Input
                required
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yeff@domain.com"
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

            <span className="inline-flex gap-1 text-sm text-slate-700">
              Already have an account
              <Link
                to="/auth/login"
                className="text-sky-600 hover:underline transition-all"
              >
                Login
              </Link>
            </span>
            <Button
              type="submit"
              disabled={result.loading}
              className="bg-sky-500 p-5 text-lg rounded-lg mt-3 font-semibold text-slate-100 hover:bg-sky-500/80 transition-all"
            >
              {result.loading ? (
                <>
                  <LucideLoader2 className="animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                'Register'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
