import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json({ limit: "10mb" }))

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

app.post("/api/analyze", async (req, res) => {
  try {
    const { image, mimeType, description, location } = req.body

    if (!image) {
      return res.status(400).json({
        error: "Image is required",
      })
    }

    const base64Image = image.replace(
      /^data:image\/\w+;base64,/,
      ""
    )

    const prompt = `
You are CivicLens AI, an AI assistant for analyzing civic issues.

Analyze the uploaded image and return ONLY valid JSON.

Identify:
- civic issue category
- severity
- confidence percentage
- impact score from 0 to 100
- concise description
- recommended action
- generated report

Possible issue categories include:
Road Damage, Pothole, Garbage, Drainage,
Streetlight, Water Leakage, Broken Footpath,
Traffic Issue, Public Infrastructure, Other.

Severity must be one of:
Low, Medium, High.

Impact score must be an integer from 0 to 100.

Do not claim that the result is an official government assessment.

Additional user description:
${description || "None"}

Reported location:
${location || "Not provided"}

Return exactly this JSON structure:

{
  "category": "Road Damage",
  "severity": "High",
  "confidence": 91,
  "impactScore": 82,
  "description": "Short description of what is visible.",
  "recommendedAction": "Suggested civic action.",
  "generatedReport": "Professional structured report."
}
`

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: mimeType || "image/jpeg",
                data: base64Image,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ],
    })

    let text = response.text.trim()

    text = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim()

    const result = JSON.parse(text)

    res.json(result)
  } catch (error) {
    console.error("Gemini error:", error)

    res.status(500).json({
      error: "AI analysis failed",
      details: error.message,
    })
  }
})

app.get("/api/health", (req, res) => {
  res.json({
    status: "CivicLens backend running",
  })
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`CivicLens backend running on http://localhost:${PORT}`)
})