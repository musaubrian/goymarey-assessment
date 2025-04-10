export default function Reply({
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
    </div>
  )
}
