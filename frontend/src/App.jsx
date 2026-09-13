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
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Insights from './pages/Insights'
import InsightDetail from './pages/InsightDetail'
import CaseStudies from './pages/CaseStudies'

function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Stats />
        <FeaturedCases />
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

        {/* Case Studies */}
        <Route path="/case-studies" element={<CaseStudies />} />

        {/* Admin */}
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
