import Header from '@/components/custom/Header'
import Post from '@/components/custom/Post'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute } from '@tanstack/react-router'
import { LucideGitPullRequestDraft, LucideSend } from 'lucide-react'
import { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { LoadingCard as LoadingCard } from '@/components/custom/LoadingCard'
import { ErrorCard } from '@/components/custom/ErrorCard'
import { EmptyState } from '@/components/custom/EmptyState'
import type { IPost } from '@/lib/types'

export const Route = createFileRoute('/')({
  component: App,
})

const GET_FEED = gql`
  query GetPosts {
    allPosts {
      id
      text
      author {
        username
      }
      replies {
        id
      }
      likeCount
      createdAt
    }
  }
`
const CREATE_POST = gql`
  mutation CreatePost($text: String!, $draft: Boolean!) {
    createPost(text: $text, draft: $draft) {
      id
    }
  }
`

function App() {
  const [newPost, setNewPost] = useState('')
  const { loading, error, data } = useQuery<{ allPosts: IPost[] }>(GET_FEED)
  const [createPost, result] = useMutation(CREATE_POST)
  const publish = () => {
    if (newPost.trim())
      createPost({ variables: { text: newPost, draft: false } })
  }
  const draft = () => {
    if (newPost.trim())
      createPost({ variables: { text: newPost, draft: true } })
  }

  return (
    <div className="h-svh flex flex-col items-center p-3 bg-slate-100 gap-3">
      <Header />
      <main className="w-full md:w-3/6 flex flex-col gap-2">
        <Dialog>
          <DialogTitle className="hidden">
            Pop-Up for a user to write their post
          </DialogTitle>
          <DialogTrigger asChild>
            <Button
              variant={'ghost'}
              className="w-full bg-slate-50 border border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-lg hover:rounded-full inline-flex items-center justify-start transition-all text-slate-700 text-lg p-5"
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
                  onClick={draft}
                  variant={'ghost'}
                  disabled={!newPost.trim() || result.loading}
                  className="bg-sky-100 hover:bg-sky-200"
                >
                  <LucideGitPullRequestDraft />
                  Save draft
                </Button>
                <Button
                  onClick={publish}
                  disabled={!newPost.trim() || result.loading}
                  className="bg-sky-600 hover:bg-sky-700"
                >
                  <LucideSend />
                  Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        {loading ? <LoadingCard message={'Getting posts...'} /> : null}
        {error ? <ErrorCard message={'Failed to fetch posts'} /> : null}
        {!loading && !error ? (
          <ScrollArea className="h-[85svh]">
            {data && data.allPosts.length > 0 ? (
              data.allPosts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  username={post.author.username}
                  timePosted={post.createdAt}
                  text={post.text}
                  replies={post.replies?.length || 0}
                  likes={post.likeCount || 0}
                />
              ))
            ) : (
              <EmptyState message={'seems a little dry..'} />
            )}
          </ScrollArea>
        ) : null}
      </main>
    </div>
  )
}
