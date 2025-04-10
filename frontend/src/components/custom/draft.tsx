import { LucideSend, LucideTrash2 } from 'lucide-react'
import { Button } from '../ui/button'

export default function Draft({
  username,
  timePosted,
  text,
}: {
  username: string
  timePosted: string
  text: string
}) {
  return (
    <div className="p-3 bg-white rounded-lg border border-slate-200/50 shadow-sm hover:shadow-md transition-all my-2">
      <div className="inline-flex w-full items-center gap-3">
        <div className="flex flex-col">
          <span className="lowercase text-slate-700 font-semibold">
            @{username}
          </span>
          <span className="text-xs text-slate-500  pl-1">{timePosted}</span>
        </div>
      </div>
      <p className="text-slate-800 my-2">{text}</p>
      <div className="inline-flex gap-3 w-full">
        <Button className="bg-sky-500 hover:bg-sky-500/80 inline-flex items-center justify-center font-semibold">
          <LucideSend className="size-4" />
          Publish
        </Button>
        <Button
          variant={'secondary'}
          className="bg-red-200 hover:bg-red-300 transition-all inline-flex items-center text-slate-800 justify-center font-semibold"
        >
          <LucideTrash2 className="size-4" />
          Delete
        </Button>
      </div>
    </div>
  )
}
