import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  return (
    <div className="bg-slate-100 h-svh flex flex-col items-center justify-center p-2">
      <Card className="w-full md:w-3/6">
        <CardHeader>
          <h1 className="text-center text-2xl text-slate-700 font-semibold">
            Login
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
                placeholder="@yeff"
                className="p-2 text-lg border border-slate-200 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-slate-500">password</label>
              <input
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
            <button
              type="submit"
              className="bg-sky-500 p-2 rounded-lg text-lg mt-3 font-semibold text-slate-100 hover:bg-sky-500/80 transition-all"
            >
              Login
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
