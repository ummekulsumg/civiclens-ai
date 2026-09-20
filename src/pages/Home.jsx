import { Link } from "react-router-dom"
import {
  ArrowRight,
  Brain,
  Camera,
  MapPin,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: Camera,
      title: "Capture",
      text: "Upload a photo of a real-world civic issue in seconds.",
    },
    {
      icon: Brain,
      title: "AI Analysis",
      text: "AI identifies the issue and provides an assisted severity assessment.",
    },
    {
      icon: MapPin,
      title: "Track",
      text: "Follow reports and explore civic issues through a community map.",
    },
    {
      icon: BarChart3,
      title: "Understand",
      text: "Turn reports into useful community-level insights.",
    },
  ]

  return (
    <main>
      <section className="overflow-hidden bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              AI-powered civic reporting
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              See the problem.
              <br />
              <span className="text-slate-400">
                Report it. Track the impact.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300">
              CivicLens AI transforms a photo of a civic issue into a
              structured, actionable and trackable report.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/report"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Report an Issue
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/map"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 px-6 py-3.5 font-semibold text-white hover:bg-white/10"
              >
                Explore Community Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            From observation to action
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            A simple workflow that turns everyday observations into
            structured civic reports.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-900">
                  <Icon size={21} />
                </div>

                <h3 className="mt-5 font-semibold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {feature.text}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="rounded-3xl bg-slate-100 p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
                <ShieldCheck size={18} />
                Built for meaningful impact
              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                Turn a simple photo into meaningful civic data.
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                CivicLens AI combines image understanding, structured
                reporting, impact assessment and community insights in one
                workflow.
              </p>
            </div>

            <div className="space-y-4">
              {[
                "AI-assisted issue identification",
                "Severity and impact assessment",
                "Structured report generation",
                "Status tracking and community insights",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={19}
                    className="shrink-0 text-emerald-600"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}