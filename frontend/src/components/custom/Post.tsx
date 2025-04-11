import { useRouter } from '@tanstack/react-router'
import { LucideHeart, LucideMessageSquare } from 'lucide-react'

export default function Post({
  id,
  username,
  timePosted,
  text,
  likes,
  replies,
}: {
  id: string
  username: string
  timePosted: string
  text: string
  likes: number
  replies: number
}) {
  const router = useRouter()
  return (
    <div
      onClick={() =>
        router.navigate({ to: '/post/$postId', params: { postId: id } })
      }
      className="p-3 bg-white rounded-lg border border-slate-200/50 shadow-sm hover:shadow-md transition-all cursor-pointer my-2"
    >
      <div className="inline-flex w-full items-center gap-3">
        <div className="flex flex-col">
          <span className="lowercase text-slate-700 font-semibold">
            @{username}
          </span>
          <span className="text-xs text-slate-500  pl-1">{timePosted}</span>
        </div>
      </div>
      <p className="text-slate-800 my-2">{text}</p>
      <hr />
      <div className="inline-flex gap-3 w-full">
        <div className="inline-flex items-center gap-1 text-slate-800 hover:text-red-600 hover:bg-red-100 p-2 justify-center rounded-lg transition-all text-sm">
          <LucideHeart className="w-4 h-4" />
          {likes}
        </div>
        <div className="inline-flex items-center gap-1 text-slate-800 hover:text-sky-600 hover:bg-sky-100 p-2 justify-center rounded-lg transition-all text-sm">
          <LucideMessageSquare className="w-4 h-4" />
          {replies}
        </div>
      </div>
    </div>
  )
}
