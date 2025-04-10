import Post from '@/components/custom/post'
import { Dialog, DialogHeader } from '@/components/ui/dialog'
import { DialogContent, DialogTrigger } from '@radix-ui/react-dialog'
import { createFileRoute, Link } from '@tanstack/react-router'
import { LucidePen } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="h-svh flex flex-col items-center p-3 bg-slate-100 gap-3">
      <header className="min-h-14 w-11/12 md:w-3/6 bg-white/20 backdrop-blur-sm shadow-md rounded-xl inline-flex items-center justify-between p-3">
        <div>Goymarey Feed</div>
        <div>
          <Link
            to="/"
            className="bg-sky-500 hover:bg-sky-500/70 transition-all text-slate-50 p-3 rounded-lg font-semibold"
          >
            Sign In
          </Link>
        </div>
      </header>
      <main className="h-svh w-full md:w-3/6 flex flex-col gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-blue-400 w-14 h-14 rounded-xl flex items-center justify-center">
              <LucidePen />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <h1>Well hello there</h1>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Post
          username="John"
          timePosted="2hrs ago"
          text="Just discovered a new pattern for handling async React state updates and it's been a game-changer for my workflow. Anyone else using this approach?"
          replies={10}
          likes={10}
        />
      </main>
    </div>
  )
}
