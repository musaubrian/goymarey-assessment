import { createFileRoute } from '@tanstack/react-router'
import '../App.css'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="App">
      <Link to="/about">About</Link>
    </div>
  )
}
