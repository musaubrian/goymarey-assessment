import Header from '@/components/custom/Header'
import Post from '@/components/custom/Post'
import Reply from '@/components/custom/Reply'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createFileRoute } from '@tanstack/react-router'
import { gql, useQuery } from '@apollo/client'
import { LoadingCard } from '@/components/custom/LoadingCard'
import { ErrorCard } from '@/components/custom/ErrorCard'
import { EmptyState } from '@/components/custom/EmptyState'

export const Route = createFileRoute('/post/$postId')({
  component: RouteComponent,
})

const GET_POST = gql`
  query GetPost($id: ID!) {
    singlePost(id: $id) {
      id
      text
      draft
      createdAt
      author {
        id
        username
      }
      replies {
        id
        text
      }
    }
  }
`

type PostType = {
  id: string
  text: string
  draft: boolean
  createdAt: string
  author: {
    id: string
    username: string
  }
  replies: {
    id: string
    text: string
  }[]
}

function RouteComponent() {
  const { postId } = Route.useParams<{ postId: string }>()
  const { loading, error, data } = useQuery<{ singlePost: PostType }>(
    GET_POST,
    {
      variables: { id: postId },
    }
  )

  const post = data?.singlePost

  return (
    <div className="h-svh bg-slate-100 flex flex-col items-center p-2">
      <Header />
      <main className="w-full md:w-2/6 mt-2">
        {loading && <LoadingCard message="Getting post" />}
        {error && <ErrorCard message="Failed to get post" />}
        {!loading && !error && post && (
          <>
            <Post
              id={post.id}
              username={post.author.username}
              timePosted={new Date(post.createdAt).toLocaleString()}
              text={post.text}
              replies={post.replies.length}
              likes={0} // You can replace this with actual likes if available
            />
            <h1 className="text-lg font-semibold text-slate-700 mt-2">
              Replies
            </h1>
            <ScrollArea className="h-[65svh] my-1">
              {post.replies.length > 0 ? (
                post.replies.map((reply) => (
                  <Reply key={reply.id} text={reply.text} />
                ))
              ) : (
                <EmptyState message="No replies yet" />
              )}
            </ScrollArea>
          </>
        )}
      </main>
    </div>
  )
}
