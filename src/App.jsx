import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import ReportIssue from "./pages/ReportIssue"
import Analysis from "./pages/Analysis"
import MyReports from "./pages/MyReports"
import MapView from "./pages/MapView"
import Dashboard from "./pages/Dashboard"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportIssue />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/reports" element={<MyReports />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}