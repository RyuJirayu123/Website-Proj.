import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Stats from './components/Stats'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FeaturedCases from './components/FeaturedCases'
import InsightsPreview from './components/InsightsPreview'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Insights from './pages/Insights'
import InsightDetail from './pages/InsightDetail'
import CaseStudies from './pages/CaseStudies'

function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1A1C1A]">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <FeaturedCases />
        <InsightsPreview />
        <About />
        <WhyUs />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken')
  if (!token) return <Navigate to="/admin/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* หน้าหลัก */}
        <Route path="/" element={<HomePage />} />

        {/* บทความ / Insights */}
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightDetail />} />

        {/* Case Studies / Track Record */}
        <Route path="/case-studies" element={<CaseStudies />} />

        {/* Admin / Client Portal */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
