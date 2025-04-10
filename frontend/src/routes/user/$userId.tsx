import { createFileRoute } from '@tanstack/react-router'
import Post from '@/components/custom/post'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Reply from '@/components/custom/reply'
import Header from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { LucidePlus } from 'lucide-react'

export const Route = createFileRoute('/user/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams()
  return (
    <div className="h-svh bg-slate-100 flex flex-col items-center p-2">
      <Header />
      <main className="w-full md:w-2/6 mt-2">
        {/* profile header */}
        <Card>
          <CardContent>
            <div className="inline-flex items-center w-full justify-between p-2">
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-semibold text-slate-700">@john</h1>
                <span className="text-slate-600 text-sm"> Joined May,2020</span>
                <Button
                  variant={'ghost'}
                  className="bg-sky-200 hover:bg-sky-200/50 text-sm"
                >
                  <LucidePlus /> Follow
                </Button>
              </div>
              <div className="inline-flex gap-1">
                <div className="flex flex-col items-center text-slate-800">
                  <span className="font-semibold text-lg">4,500</span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center text-slate-800">
                  <span className="font-semibold text-lg">4,500</span>
                  <span className="text-sm">Following</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Tabs defaultValue="posts" className="w-full mt-3">
          <TabsList className="w-full text-lg">
            <TabsTrigger value="posts" className="text-lg">
              Posts
            </TabsTrigger>
            <TabsTrigger value="replies" className="text-lg">
              Replies
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <ScrollArea className="h-[70svh]">
              <Post
                id={'2'}
                username="John"
                timePosted="2hrs ago"
                text="Just discovered a new pattern for handling async React state updates and it's been a game-changer for my workflow. Anyone else using this approach?"
                replies={10}
                likes={10}
              />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="replies">
            <ScrollArea className="h-[70svh]">
              <Reply
                username="John"
                timePosted="2hrs ago"
                text="Just discovered a new pattern for handling async React state updates and it's been a game-changer for my workflow. Anyone else using this approach?"
              />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
