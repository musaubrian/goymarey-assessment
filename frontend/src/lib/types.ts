export interface IPost {
  id: string
  text: string
  draft?: boolean
  createdAt: string
  author: {
    id: string
    username: string
  }
  likedBy?: {
    id: string
  }[]
  replies?: {
    id: string
    text: string
    createdAt: string
  }[]
  likeCount: number
}
