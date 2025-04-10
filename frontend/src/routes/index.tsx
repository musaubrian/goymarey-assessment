import Header from '@/components/custom/header'
import Post from '@/components/custom/post'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import { LucideGitPullRequestDraft, LucidePen, LucideSend } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [newPost, setNewPost] = useState('')
  return (
    <div className="h-svh flex flex-col items-center p-3 bg-slate-100 gap-3">
      <Header />
      <main className="w-full md:w-3/6 flex flex-col gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={'ghost'}
              className="w-full bg-slate-50 border border-slate-200 hover:bg-white hover:border-white hover:rounded-full inline-flex items-center justify-start transition-all text-slate-700 text-lg p-5"
            >
              What's up?
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="p-4">
              <Textarea
                placeholder="Scream into the void..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="resize-none min-h-[100px] border-none focus-visible:ring-0 p-0 shadow-none"
              />

              <div className="flex justify-end items-center mt-3 gap-2 pt-3 border-t">
                <Button
                  variant={'ghost'}
                  disabled={!newPost.trim()}
                  className="bg-sky-100 hover:bg-sky-200"
                >
                  <LucideGitPullRequestDraft />
                  Save draft
                </Button>
                <Button
                  disabled={!newPost.trim()}
                  className="bg-sky-600 hover:bg-sky-700"
                >
                  <LucideSend />
                  Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <ScrollArea className="h-[85svh]">
          <Post
            id={'2'}
            username="John"
            timePosted="2hrs ago"
            text="Just discovered a new pattern for handling async React state updates and it's been a game-changer for my workflow. Anyone else using this approach?"
            replies={10}
            likes={10}
          />
        </ScrollArea>
      </main>
    </div>
  )
}
