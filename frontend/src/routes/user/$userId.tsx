import { createFileRoute } from '@tanstack/react-router'
import Post from '@/components/custom/Post'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Reply from '@/components/custom/Reply'
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { LucideCheck, LucidePlus } from 'lucide-react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { LoadingCard } from '@/components/custom/LoadingCard'
import { ErrorCard } from '@/components/custom/ErrorCard'
import { EmptyState } from '@/components/custom/EmptyState'

export const Route = createFileRoute('/user/$userId')({
  component: RouteComponent,
})

const GET_USER_PROFILE = gql`
  query GetProfile($id: ID!) {
    user(id: $id) {
      username
      followedBy {
        id
      }
      following {
        id
      }
      createdAt
    }
  }
`

const GET_USER_POSTS_N_REPLIES = gql`
  query GetPostsnReplies($userId: ID!) {
    userPosts(userId: $userId) {
      id
      text
      createdAt
      author {
        username
      }
      replies {
        id
        text
        createdAt
      }
      replyCount
      likeCount
    }
  }
`

const UNFOLLOW_USER = gql`
  mutation FollowUser($id: ID!) {
    unfollowUser(userId: $id)
  }
`
const FOLLOW_USER = gql`
  mutation FollowUser($id: ID!) {
    followUser(userId: $id)
  }
`

function RouteComponent() {
  const { userId } = Route.useParams()
  const currentUserId = localStorage.getItem('userId')

  const [followUser] = useMutation(FOLLOW_USER)
  const [unfollowUser] = useMutation(UNFOLLOW_USER)

  const {
    loading: loadingProfile,
    error: errorProfile,
    data: profileData,
  } = useQuery(GET_USER_PROFILE, {
    variables: {
      id: userId,
    },
  })

  const {
    loading: loadingPosts,
    error: errorPosts,
    data: postsData,
  } = useQuery(GET_USER_POSTS_N_REPLIES, {
    variables: {
      userId,
    },
  })

  const isLoading = loadingProfile || loadingPosts
  const isError = errorProfile || errorPosts
  const allPosts = postsData?.userPosts || []
  const posts = allPosts.filter((p) => !p.draft)

  const isFollowing = profileData?.user?.followedBy?.some(
    (f: { id: string }) => f.id === currentUserId
  )

  const follow = () => {
    followUser({ variables: { id: userId } })
  }

  const unfollow = () => {
    unfollowUser({ variables: { id: userId } })
  }

  return (
    <div className="h-svh bg-slate-100 flex flex-col items-center p-2">
      <Header />
      <main className="w-full md:w-2/6 mt-2">
        {/* profile header */}
        <Card>
          <CardContent>
            <div className="inline-flex items-center w-full justify-between p-2">
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-semibold text-slate-700">
                  @{profileData?.user?.username}
                </h1>
                <span className="text-slate-600 text-sm">
                  Joined {profileData?.user?.createdAt}
                </span>
                {currentUserId !== userId && (
                  <Button
                    onClick={isFollowing ? unfollow : follow}
                    variant={isFollowing ? 'outline' : 'ghost'}
                    className={
                      isFollowing
                        ? 'border-sky-500 text-sky-600 hover:bg-sky-50 text-sm'
                        : 'bg-sky-200 hover:bg-sky-200/50 text-sm'
                    }
                  >
                    {isFollowing ? (
                      <>
                        <LucideCheck /> Following
                      </>
                    ) : (
                      <>
                        <LucidePlus className="mr-1" /> Follow
                      </>
                    )}
                  </Button>
                )}
              </div>
              <div className="inline-flex gap-1">
                <div className="flex flex-col items-center text-slate-800">
                  <span className="font-semibold text-lg">
                    {profileData?.user?.followedBy?.length || 0}
                  </span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center text-slate-800">
                  <span className="font-semibold text-lg">
                    {profileData?.user?.following?.length || 0}
                  </span>
                  <span className="text-sm">Following</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading && <LoadingCard message={'Getting their thoughts...'} />}
        {isError && <ErrorCard message={'Failed to fetch their posts'} />}
        {!isLoading && !isError && (
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
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <Post
                      key={post.id}
                      id={post.id}
                      username={post.author.username}
                      timePosted={post.createdAt}
                      text={post.text}
                      replies={post.replyCount}
                      likes={post.likeCount}
                    />
                  ))
                ) : (
                  <EmptyState message={'No posts yet'} />
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="replies">
              <ScrollArea className="h-[70svh]">
                {posts.replies.length > 0 ? (
                  posts.replies.map((reply) => (
                    <Reply key={reply.id} text={reply.text} />
                  ))
                ) : (
                  <EmptyState message="No replies yet" />
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  )
}
