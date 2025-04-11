import { LucideLoader } from 'lucide-react'
import { Card, CardContent, CardDescription } from '../ui/card'

export function LoadingCard({ message }: { message: string }) {
  return (
    <Card className="mt-2">
      <CardDescription className="hidden">
        Loading card with the message: "{message}"
      </CardDescription>
      <CardContent className="flex flex-col items-center justify-center text-lg text-slate-800 gap-2">
        <LucideLoader className="animate-spin size-8" />
        {message}
      </CardContent>
    </Card>
  )
}
