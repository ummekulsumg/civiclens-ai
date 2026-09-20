# CivicLens AI

### See the Problem. Report It. Track the Impact.

CivicLens AI is an AI-powered civic issue reporting platform that helps people report everyday public problems such as potholes, garbage accumulation, damaged roads, broken streetlights, drainage issues and other infrastructure concerns.

Users can upload an image of an issue, let AI analyze it, receive an issue category and severity level, generate a structured report, and track the issue through the platform.

## Why CivicLens AI?

Many civic problems are noticed every day but are difficult to report and follow up on.

CivicLens AI simplifies this process by turning a simple photo into a structured and actionable civic report.

### How it works

Upload a photo  
↓  
AI analyzes the issue  
↓  
Issue category and severity are identified  
↓  
AI-assisted impact score is generated  
↓  
A structured report is created  
↓  
User submits the issue  
↓  
Issue can be tracked and visualized

## Key Features

- AI-powered civic issue analysis
- Image-based issue detection
- Issue category classification
- AI-assisted severity assessment
- AI-assisted impact score
- AI-generated report description
- Civic issue tracking
- Community issue map
- Analytics dashboard
- Responsive and user-friendly interface

## Example Issues

CivicLens AI can be used to report problems such as:

- Potholes and road damage
- Garbage accumulation
- Broken streetlights
- Drainage problems
- Water leakage
- Damaged public infrastructure

## Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS

### AI
- Gemini API

### Backend and Database
- Supabase
- PostgreSQL
- Supabase Storage

### Maps
- Leaflet
- OpenStreetMap

### Deployment
- Vercel

## Project Structure

```text
civiclens-ai/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   ├── data/
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
````

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

### Install the project

```bash
git clone <your-github-repository-url>
cd civiclens-ai
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at the local development URL shown in your terminal.

## Environment Variables

Create a `.env` file in the project root.

Add the required API keys and configuration values:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Never commit your `.env` file to GitHub.

## User Flow

```text
User
  ↓
Upload Civic Issue Image
  ↓
AI Analysis
  ↓
Category + Severity
  ↓
Impact Score
  ↓
AI Generated Report
  ↓
Submit Issue
  ↓
Track Status
  ↓
Community Map
  ↓
Dashboard
```

## Impact

CivicLens AI aims to make civic issue reporting simpler, more structured and easier to track.

The platform can potentially be adapted for:

* Residential communities
* Educational campuses
* Local civic organizations
* Municipal service systems
* Smart-city initiatives

## Future Scope

Possible future improvements include:

* Duplicate issue detection
* Real-time notifications
* Multilingual reporting
* Voice-based reporting
* Advanced geospatial analytics
* Integration with official civic service systems
* Automated status updates
* Community verification
* Offline reporting support

## Hackathon

Built for **HACKDAY 1.0** under the theme:

**Tech for a Better Tomorrow**

### Team

Built with a focus on real-world impact, practical AI integration and an accessible user experience.

## Disclaimer

The AI-generated category, severity and impact score are intended to assist users in organizing civic reports. They should not be treated as official government classifications or priorities.

---

**CivicLens AI — See the Problem. Report It. Track the Impact.**

```

