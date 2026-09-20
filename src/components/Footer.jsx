export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-8 md:flex-row md:items-center lg:px-8">
        <div>
          <div className="font-semibold text-slate-900">CivicLens AI</div>
          <div className="mt-1 text-sm text-slate-500">
            See the Problem. Report It. Track the Impact.
          </div>
        </div>

        <div className="text-sm text-slate-400">
          HACKDAY 1.0 · Tech for a Better Tomorrow
        </div>
      </div>
    </footer>
  )
}