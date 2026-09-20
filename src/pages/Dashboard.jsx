import { useEffect, useState } from "react"
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
} from "lucide-react"

export default function Dashboard() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    setReports(
      JSON.parse(localStorage.getItem("civiclens_reports") || "[]")
    )
  }, [])

  const total = 128 + reports.length
  const resolved = 74
  const pending = 42 + reports.length
  const highImpact = 12 + reports.filter(
    (r) => r.severity === "High"
  ).length

  const stats = [
    {
      label: "Total Reports",
      value: total,
      icon: FileText,
    },
    {
      label: "Resolved",
      value: resolved,
      icon: CheckCircle2,
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
    },
    {
      label: "High Impact",
      value: highImpact,
      icon: AlertTriangle,
    },
  ]

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          Civic intelligence
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
          Impact Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          A high-level view of reported civic issues and community activity.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <Icon size={19} />
                </div>

                <TrendingUp size={17} className="text-emerald-600" />
              </div>

              <p className="mt-6 text-sm text-slate-500">{stat.label}</p>

              <p className="mt-1 text-3xl font-bold text-slate-950">
                {stat.value}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-7 grid gap-7 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-7">
          <h2 className="font-bold text-slate-950">
            Issue distribution
          </h2>

          <div className="mt-7 space-y-5">
            {[
              ["Garbage & Waste", 82],
              ["Road Damage", 68],
              ["Drainage", 47],
              ["Streetlights", 35],
              ["Other", 21],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-600">
                    {label}
                  </span>
                  <span className="font-bold text-slate-900">
                    {value}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-900"
                    style={{ width: `${(value / 82) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7">
          <h2 className="font-bold text-slate-950">
            Recent reports
          </h2>

          <div className="mt-5 divide-y divide-slate-100">
            {[
              ["Road Damage", "High", "In Progress"],
              ["Garbage", "Medium", "Reported"],
              ["Streetlight", "Low", "Resolved"],
              ...reports.slice(0, 2).map((r) => [
                r.category,
                r.severity,
                r.status,
              ]),
            ].map(([issue, severity, status], index) => (
              <div
                key={`${issue}-${index}`}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {issue}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Severity: {severity}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}