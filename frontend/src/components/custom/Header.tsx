import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="min-h-14 w-11/12 md:w-2/6 bg-white/20 backdrop-blur-sm shadow-md rounded-xl inline-flex items-center justify-between p-3">
      <div>Goymarey Feed</div>
      <div>
        <Link
          to="/auth/login"
          className="bg-sky-600 hover:bg-sky-500/70 transition-all text-slate-50 p-3 rounded-lg font-semibold"
        >
          Sign In
        </Link>
      </div>
    </header>
  )
}
