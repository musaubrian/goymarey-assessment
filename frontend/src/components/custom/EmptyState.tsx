import { LucideWand } from 'lucide-react'
import { Card, CardContent, CardDescription } from '../ui/card'

export function EmptyState({ message }: { message: string }) {
  return (
    <Card className="mt-2">
      <CardDescription className="hidden">
        Empty state with message: "{message}"
      </CardDescription>
      <CardContent className="flex flex-col items-center justify-center text-lg text-slate-700 gap-1">
        <LucideWand className="text-slate-500 size-8" />
        {message}
      </CardContent>
    </Card>
  )
}
