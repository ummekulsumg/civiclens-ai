import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Menu, X, ScanLine } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { name: "Home", path: "/" },
    { name: "My Reports", path: "/reports" },
    { name: "Community Map", path: "/map" },
    { name: "Dashboard", path: "/dashboard" },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
            <ScanLine size={21} />
          </div>

          <div>
            <div className="text-lg font-bold tracking-tight text-slate-950">
              CivicLens AI
            </div>
            <div className="text-[11px] font-medium text-slate-500">
              Smarter civic action
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-slate-950"
                    : "text-slate-500 hover:text-slate-950"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Link
            to="/report"
            className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Report an Issue
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-700 md:hidden"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700"
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/report"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-slate-950 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Report an Issue
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}