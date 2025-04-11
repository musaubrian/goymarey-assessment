import Draft from '@/components/custom/Draft'
import Post from '@/components/custom/Post'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { gql, useQuery } from '@apollo/client'
import { EmptyState } from '@/components/custom/EmptyState'
import { LoadingCard } from '@/components/custom/LoadingCard'
import { ErrorCard } from '@/components/custom/ErrorCard'
import Header from '@/components/custom/Header'
import { useEffect } from 'react'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

const GET_PROFILE = gql`
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

const GET_POSTS_N_REPLIES = gql`
  query GetPostsnReplies($userId: ID!) {
    userPosts(userId: $userId) {
      id
      text
      draft
      createdAt
      author {
        username
      }
      replyCount
      likeCount
    }
  }
`

type User = {
  username: string
  followedBy: { id: string }[]
  following: { id: string }[]
  createdAt: string
}

type PostType = {
  id: string
  text: string
  draft: boolean
  createdAt: string
  author: { username: string }
  replies: { id: string }[]
  replyCount: number
  likeCount: number
}

type GetProfileResponse = {
  user: User
}

type GetPostsResponse = {
  userPosts: PostType[]
}

function RouteComponent() {
  const navigate = useNavigate()
  useEffect(() => {
    const authToken = localStorage.getItem('authToken')
    if (!authToken) {
      navigate({
        to: '/auth/login',
        search: { redirect: window.location.href },
      })
    }
  }, [])
  const userId = localStorage.getItem('userId') ?? ''
  const {
    loading: loadingProfile,
    error: errorProfile,
    data: profileData,
  } = useQuery<GetProfileResponse>(GET_PROFILE, {
    variables: { id: userId },
    skip: !userId,
  })

  const {
    loading: loadingPosts,
    error: errorPosts,
    data: postsData,
  } = useQuery<GetPostsResponse>(GET_POSTS_N_REPLIES, {
    variables: { userId },
    skip: !userId,
  })

  const isLoading = loadingProfile || loadingPosts
  const isError = errorProfile || errorPosts
  const allPosts = postsData?.userPosts ?? []
  const posts = allPosts.filter((p) => !p.draft)
  const drafts = allPosts.filter((p) => p.draft)

  return (
    <div className="h-svh bg-slate-100 flex flex-col items-center p-2">
      <Header />
      <main className="w-full md:w-2/6 mt-2">
        {isLoading && <LoadingCard message="Setting up your profile..." />}
        {isError && <ErrorCard message="Failed to fetch your posts" />}

        {!isLoading && !isError && profileData && (
          <>
            <Card>
              <CardContent>
                <div className="inline-flex items-center w-full justify-between p-2">
                  <div>
                    <h1 className="text-xl font-semibold text-slate-700">
                      @{profileData.user.username}
                    </h1>
                    <span className="text-slate-600 text-sm">
                      Joined{' '}
                      {new Date(profileData.user.createdAt).toLocaleDateString(
                        'en-US',
                        { month: 'short', year: 'numeric' }
                      )}
                    </span>
                  </div>
                  <div className="inline-flex gap-1">
                    <div className="flex flex-col items-center text-slate-800">
                      <span className="font-semibold text-lg">
                        {profileData.user.followedBy.length}
                      </span>
                      <span className="text-sm">Followers</span>
                    </div>
                    <div className="flex flex-col items-center text-slate-800">
                      <span className="font-semibold text-lg">
                        {profileData.user.following.length}
                      </span>
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
                <TabsTrigger value="drafts" className="text-lg">
                  Drafts
                </TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                <ScrollArea className="h-[78svh]">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <Post
                        key={post.id}
                        username={post.author.username}
                        id={post.id}
                        timePosted={post.createdAt}
                        text={post.text}
                        likes={post.likeCount}
                        replies={post.replyCount}
                      />
                    ))
                  ) : (
                    <EmptyState message="No posts yet" />
                  )}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="drafts">
                <ScrollArea className="h-[78svh]">
                  {drafts.length > 0 ? (
                    drafts.map((draft) => (
                      <Draft
                        key={draft.id}
                        id={draft.id}
                        username={draft.author.username}
                        timePosted={draft.createdAt}
                        text={draft.text}
                      />
                    ))
                  ) : (
                    <EmptyState message="Nothing to see here" />
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  )
}
