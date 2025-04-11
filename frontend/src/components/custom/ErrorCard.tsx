import { LucideTriangleAlert } from 'lucide-react'
import { Card, CardContent, CardDescription } from '../ui/card'

export function ErrorCard({ message }: { message: string }) {
  return (
    <Card className="bg-red-200/50 mt-2">
      <CardDescription className="hidden">
        Error card with the message: "{message}"
      </CardDescription>
      <CardContent className="flex flex-col items-center justify-center text-lg text-slate-800 gap-1">
        <LucideTriangleAlert className="text-red-400 size-8" />
        {message}
      </CardContent>
    </Card>
  )
}
