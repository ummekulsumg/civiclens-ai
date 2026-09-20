import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Upload,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  X,
  ArrowRight,
} from "lucide-react"

export default function ReportIssue() {
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("Bengaluru, Karnataka")
  const [dragging, setDragging] = useState(false)

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file.")
      return
    }

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleInput = (event) => {
    const file = event.target.files?.[0]
    handleFile(file)
  }

  const removeImage = () => {
    setImage(null)
    setPreview("")
  }

  const analyze = () => {
    if (!image) {
      alert("Please upload an image first.")
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      const reportData = {
        image: reader.result,
        imageName: image.name,
        mimeType: image.type,
        description,
        location,
      }

      sessionStorage.setItem(
        "civiclens_pending_report",
        JSON.stringify(reportData)
      )

      navigate("/analysis")
    }

    reader.readAsDataURL(image)
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-12 lg:px-8 lg:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          New report
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">
          Report a civic issue
        </h1>

        <p className="mt-3 leading-7 text-slate-600">
          Upload a photo and let CivicLens AI turn your observation into a
          structured report.
        </p>
      </div>

      <div className="mt-10 grid gap-7 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              handleFile(e.dataTransfer.files?.[0])
            }}
            className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition ${
              dragging
                ? "border-slate-900 bg-slate-100"
                : "border-slate-300 bg-slate-50"
            }`}
          >
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Selected civic issue"
                  className="h-[360px] w-full object-cover"
                />

                <button
                  onClick={removeImage}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-4 left-4 rounded-lg bg-slate-950/80 px-3 py-2 text-xs text-white backdrop-blur">
                  {image?.name}
                </div>
              </div>
            ) : (
              <label className="flex min-h-[360px] cursor-pointer flex-col items-center justify-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                  <Upload size={24} />
                </div>

                <h2 className="mt-5 font-semibold text-slate-900">
                  Upload an image
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Drag and drop an image here, or click to choose one from
                  your device.
                </p>

                <span className="mt-5 rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                  Choose Image
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInput}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="mt-7">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Additional description
              <span className="ml-1 font-normal text-slate-400">
                (optional)
              </span>
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us anything important about this issue..."
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold text-slate-800">
              Location
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <MapPin size={18} className="text-slate-500" />

              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
              />
            </div>
          </div>

          <button
            onClick={analyze}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 font-semibold text-white transition hover:bg-slate-800"
          >
            <Sparkles size={18} />
            Analyze with AI
            <ArrowRight size={17} />
          </button>
        </div>

        <aside className="h-fit rounded-3xl bg-slate-950 p-7 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
            <Sparkles size={21} />
          </div>

          <h2 className="mt-6 text-xl font-bold">
            What happens next?
          </h2>

          <div className="mt-6 space-y-5">
            {[
              ["01", "AI analyzes the image"],
              ["02", "Issue category is identified"],
              ["03", "Severity and impact are estimated"],
              ["04", "A structured report is generated"],
            ].map(([number, text]) => (
              <div key={number} className="flex gap-4">
                <span className="text-sm font-bold text-slate-500">
                  {number}
                </span>

                <span className="text-sm leading-6 text-slate-300">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <ImageIcon size={17} />
              Supported image formats: JPG, PNG, WEBP
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}