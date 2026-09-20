import { MapPin, Layers, Navigation } from "lucide-react"

export default function MapView() {
  const issues = [
    { x: "25%", y: "32%", type: "Road Damage", level: "High" },
    { x: "64%", y: "25%", type: "Garbage", level: "Medium" },
    { x: "48%", y: "58%", type: "Drainage", level: "High" },
    { x: "76%", y: "67%", type: "Streetlight", level: "Low" },
    { x: "33%", y: "75%", type: "Pothole", level: "High" },
  ]

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          Community
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
          Community Map
        </h1>

        <p className="mt-2 text-slate-500">
          Explore reported civic issues across the community.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="relative h-[560px] overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="absolute left-8 top-8 rounded-xl bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Navigation size={16} />
              Bengaluru Community View
            </div>
          </div>

          {issues.map((issue, index) => (
            <div
              key={index}
              className="group absolute"
              style={{ left: issue.x, top: issue.y }}
            >
              <button className="flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950 text-white shadow-lg ring-4 ring-white">
                <MapPin size={18} />
              </button>

              <div className="pointer-events-none absolute left-1/2 top-8 z-10 hidden w-44 -translate-x-1/2 rounded-xl bg-slate-950 p-3 text-white shadow-xl group-hover:block">
                <p className="text-xs font-bold">{issue.type}</p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Severity: {issue.level}
                </p>
              </div>
            </div>
          ))}

          <div className="absolute bottom-5 left-5 rounded-xl bg-white p-4 shadow-lg">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-950" />
              Reported issues
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2">
            <Layers size={19} />
            <h2 className="font-bold text-slate-950">Map insights</h2>
          </div>

          <div className="mt-6 space-y-3">
            {[
              ["Total issues", "128"],
              ["High impact", "42"],
              ["In progress", "31"],
              ["Resolved", "74"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-4"
              >
                <span className="text-sm text-slate-500">{label}</span>
                <span className="font-bold text-slate-950">{value}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs leading-5 text-slate-400">
            Map visualization is currently a prototype view. Live
            geospatial data can be connected through a mapping service.
          </p>
        </aside>
      </div>
    </main>
  )
}