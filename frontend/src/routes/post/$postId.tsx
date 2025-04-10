import Header from '@/components/custom/header'
import Post from '@/components/custom/post'
import Reply from '@/components/custom/reply'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/post/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { postId } = Route.useParams()
  return (
    <div className="h-svh bg-slate-100 flex flex-col items-center p-2">
      <Header />
      <main className="w-full md:w-2/6 mt-2">
        <Post
          id={'2'}
          username="John"
          timePosted="2hrs ago"
          text="Just discovered a new pattern for handling async React state updates and it's been a game-changer for my workflow. Anyone else using this approach?"
          replies={10}
          likes={10}
        />
        <h1 className="text-lg font-semibold text-slate-700 mt-2">Replies</h1>
        <ScrollArea className="h-[65svh] my-1">
          <Reply
            id={'2'}
            username="John"
            timePosted="2hrs ago"
            text="Just discovered a new pattern for handling async React state updates and it's been a game-changer for my workflow. Anyone else using this approach?"
          />
          <Reply
            id={'2'}
            username="John"
            timePosted="2hrs ago"
            text="Just discovered a new pattern for handling async React state updates and it's been a game-changer for my workflow. Anyone else using this approach?"
          />
        </ScrollArea>
      </main>
    </div>
  )
}
