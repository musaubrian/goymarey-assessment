import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="h-svh flex justify-center items-center bg-slate-50">
      <h1 className="text-5xl font-semibold italic animate-ping">Init</h1>
    </div>
  )
}
