export default function Reply({ text }: { text: string }) {
  return (
    <div className="p-3 bg-white rounded-lg border border-slate-200/50 shadow-sm hover:shadow-md transition-all my-2">
      <p className="text-slate-800 my-2">{text}</p>
    </div>
  )
}
