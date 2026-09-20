import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, MapPin, Plus, Clock3 } from "lucide-react"

export default function MyReports() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("civiclens_reports") || "[]"
    )

    setReports(saved)
  }, [])

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            Your activity
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
            My Reports
          </h1>

          <p className="mt-2 text-slate-500">
            Track the civic issues you have reported.
          </p>
        </div>

        <Link
          to="/report"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
        >
          <Plus size={17} />
          New Report
        </Link>
      </div>

      {reports.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <Clock3 />
          </div>

          <h2 className="mt-5 font-bold text-slate-900">
            No reports yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Your submitted civic issues will appear here.
          </p>

          <Link
            to="/report"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
          >
            Create your first report
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report) => (
            <div
              key={report.id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              {report.image && (
                <img
                  src={report.image}
                  alt={report.category}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-bold text-slate-400">
                    {report.id}
                  </span>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {report.status}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-bold text-slate-950">
                  {report.category}
                </h2>

                <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin size={15} />
                  {report.location}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">
                      Impact score
                    </p>
                    <p className="font-bold text-slate-900">
                      {report.impactScore}/100
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Severity
                    </p>
                    <p className="font-bold text-orange-600">
                      {report.severity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}