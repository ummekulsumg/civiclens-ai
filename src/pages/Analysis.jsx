import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function Analysis() {
  const navigate = useNavigate()

  const [report, setReport] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const stored = sessionStorage.getItem("civiclens_pending_report")

    if (!stored) {
      navigate("/report")
      return
    }

    const reportData = JSON.parse(stored)
    setReport(reportData)

    analyzeImage(reportData)
  }, [])

  const analyzeImage = async (reportData) => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: reportData.image,
          mimeType: reportData.mimeType,
          description: reportData.description,
          location: reportData.location,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "AI analysis failed")
      }

      setResult(data)
    } catch (err) {
      console.error(err)
      setError(err.message || "Unable to analyze the image")
    } finally {
      setLoading(false)
    }
  }

  const submitReport = () => {
    if (!result || !report) return

    const newReport = {
      id: `CL-${Date.now().toString().slice(-6)}`,
      image: report.image,
      imageName: report.imageName,
      description: report.description,
      location: report.location,
      category: result.category,
      severity: result.severity,
      confidence: result.confidence,
      impactScore: result.impactScore,
      generatedReport: result.generatedReport,
      recommendedAction: result.recommendedAction,
      status: "Reported",
      createdAt: new Date().toISOString(),
    }

    const existingReports = JSON.parse(
      localStorage.getItem("civiclens_reports") || "[]"
    )

    localStorage.setItem(
      "civiclens_reports",
      JSON.stringify([newReport, ...existingReports])
    )

    sessionStorage.removeItem("civiclens_pending_report")

    navigate("/reports")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-600" />
          <h2 className="mt-4 text-2xl font-bold text-slate-900">
            CivicLens AI is analyzing...
          </h2>
          <p className="mt-2 text-slate-500">
            Detecting the civic issue and estimating its impact
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <AlertCircle className="w-14 h-14 text-red-500 mx-auto" />

          <h2 className="mt-4 text-2xl font-bold text-slate-900">
            Analysis Failed
          </h2>

          <p className="mt-3 text-red-600">
            {error}
          </p>

          <button
            onClick={() => navigate("/report")}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <p className="text-blue-600 font-semibold">
            CIVICLENS AI
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
            AI Analysis Result
          </h1>

          <p className="text-slate-500 mt-2">
            AI-generated analysis of your reported civic issue
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Uploaded Image
            </h2>

            <img
              src={report?.image}
              alt="Reported civic issue"
              className="w-full rounded-xl max-h-[450px] object-cover"
            />

            {report?.description && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-500">
                  Your Description
                </p>

                <p className="mt-1 text-slate-700">
                  {report.description}
                </p>
              </div>
            )}

            {report?.location && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-500">
                  Location
                </p>

                <p className="mt-1 text-slate-700">
                  {report.location}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-5">

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Detected Issue
                  </p>

                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    {result?.category}
                  </h2>
                </div>

                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500">
                    Confidence
                  </p>

                  <p className="text-2xl font-bold text-blue-600">
                    {result?.confidence}%
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-sm text-slate-500">
                    Severity
                  </p>

                  <p className="text-2xl font-bold text-orange-600">
                    {result?.severity}
                  </p>
                </div>

              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <p className="text-sm text-slate-500">
                Community Impact Score
              </p>

              <div className="flex items-end gap-2 mt-2">
                <span className="text-5xl font-bold text-blue-600">
                  {result?.impactScore}
                </span>

                <span className="text-slate-500 mb-2">
                  / 100
                </span>
              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full mt-4">
                <div
                  className="h-3 bg-blue-600 rounded-full"
                  style={{
                    width: `${result?.impactScore || 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-slate-900">
                AI Description
              </h3>

              <p className="text-slate-600 mt-2">
                {result?.description}
              </p>

              <h3 className="font-bold text-slate-900 mt-5">
                Recommended Action
              </h3>

              <p className="text-slate-600 mt-2">
                {result?.recommendedAction}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-slate-900">
                Generated Civic Report
              </h3>

              <p className="text-slate-600 mt-3 whitespace-pre-line">
                {result?.generatedReport}
              </p>
            </div>

            <button
              onClick={submitReport}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg"
            >
              Submit Civic Report
            </button>

          </div>
        </div>
      </div>
    </div>
  )
}