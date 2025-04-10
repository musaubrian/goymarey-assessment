import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="bg-slate-100 h-svh flex flex-col items-center justify-center p-2">
      <Card className="w-full md:w-3/6">
        <CardHeader>
          <h1 className="text-center text-2xl text-slate-700 font-semibold">
            Register
          </h1>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => console.log(e)}
            className="w-full flex flex-col gap-3"
          >
            <div className="flex flex-col">
              <label className="text-slate-500">username</label>
              <input
                required
                placeholder="@yeff"
                className="p-2 text-lg border border-slate-200 rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-slate-500">email</label>
              <input
                required
                placeholder="yeff@domain.com"
                className="p-2 text-lg border border-slate-200 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-slate-500">password</label>
              <input
                required
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
            <button
              type="submit"
              className="bg-sky-500 p-2 rounded-lg text-lg mt-3 font-semibold text-slate-100 hover:bg-sky-500/80 transition-all"
            >
              Register
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
