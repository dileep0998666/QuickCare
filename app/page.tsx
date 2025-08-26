"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Users,
  Phone,
  Menu,
  X,
  Heart,
  Shield,
  Clock,
  Mail,
  MessageCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  Zap,
  Globe,
  Building,
  Calendar,
  Award,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useAuth } from "../../contexts/AuthContext"  


const availableCities = [
  { id: "hyderabad", name: "Hyderabad", available: true },
  { id: "bangalore", name: "Bangalore", available: false },
  { id: "mumbai", name: "Mumbai", available: false },
  { id: "delhi", name: "Delhi", available: false },
  { id: "chennai", name: "Chennai", available: false },
  { id: "kolkata", name: "Kolkata", available: false },
]

export default function HomePage() {
  const [selectedCity, setSelectedCity] = useState("")
  const [showUnavailableMessage, setShowUnavailableMessage] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const router = useRouter()
  const { user, loading, logout } = useAuth()

  // Handle header visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHeaderVisible(false)
      } else {
        setHeaderVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleCitySelect = (cityId: string) => {
    const city = availableCities.find((c) => c.id === cityId)
    setSelectedCity(cityId)

    if (city?.available) {
      setShowUnavailableMessage(false)
      // Navigate to locations page after a brief delay
      setTimeout(() => {
        router.push("/locations")
      }, 1000)
    } else {
      setShowUnavailableMessage(true)
    }
  }

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Hospitals", href: "/hospitals" },
    { name: "Doctors", href: "/doctors" },
    { name: "Appointments", href: "/appointments" },
    { name: "Emergency", href: "/emergency" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        color: "#1e293b",
        lineHeight: "1.6",
      }}
    >
      {/* Professional Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerVisible ? "translate-y-0" : "-translate-y-full"}`}
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="py-5">
            <div className="flex items-center justify-between">
              {/* Enhanced Logo */}
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Heart className="w-6 h-6 text-white transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-sm"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    QuickCare
                  </h1>
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Healthcare Excellence</p>
                </div>
              </div>

              {/* Professional Navigation */}
              <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative text-slate-300 hover:text-white transition-all duration-300 text-sm font-semibold uppercase tracking-wider group px-3 py-2 rounded-lg hover:bg-slate-800/30"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-3 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-[calc(100%-24px)] rounded-full"></span>
                  </Link>
                ))}
              </nav>

              {/* Enhanced Auth Section */}
              <div className="hidden md:flex items-center space-x-4">
                {!loading && !user ? (
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 relative overflow-hidden group">
                      <span className="relative z-10">Login</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </Link>
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-3 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                      <span className="text-green-200 text-sm font-semibold">Welcome, {user?.name}</span>
                    </div>
                    <Button
                      onClick={logout}
                      variant="outline"
                      size="sm"
                      className="text-white border-white/20 hover:bg-white/10 bg-transparent font-semibold"
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-3 rounded-xl hover:bg-slate-800/50 transition-all duration-300 border border-slate-700"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>

            {/* Enhanced Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden">
                <div className="pt-6 pb-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <nav className="space-y-3">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block py-3 px-4 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-300 uppercase tracking-wider font-semibold text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div
                    className="flex items-center justify-between mt-6 pt-4 px-4"
                    style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-200 text-sm font-semibold">
                        {user ? `Welcome, ${user.name}` : "System Online"}
                      </span>
                    </div>
                    {user && (
                      <Button
                        onClick={() => {
                          logout()
                          setMobileMenuOpen(false)
                        }}
                        variant="outline"
                        size="sm"
                        className="text-white border-white/20 hover:bg-white/10 bg-transparent text-xs"
                      >
                        Logout
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 flex-grow" style={{ marginTop: "120px" }}>
        {/* Professional Hero Section */}
        <div className="text-center mb-16">
          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-slate-800 via-blue-800 to-slate-800 bg-clip-text text-transparent leading-tight">
              Welcome to QuickCare
            </h2>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-60"></div>
          </div>
          <p className="text-2xl text-slate-600 font-bold mb-4 max-w-4xl mx-auto leading-relaxed">
            Your Modern Healthcare Appointment Platform
          </p>
          <p className="text-xl text-slate-500 font-semibold max-w-3xl mx-auto">
            Think of it like{" "}
            <span className="font-black text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
              BookMyShow, but for hospitals
            </span>
          </p>
        </div>

        {/* Enhanced Location Selection */}
        <div className="max-w-4xl mx-auto mb-20">
          <div
            className="relative p-10 rounded-2xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
              border: "1px solid #e2e8f0",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.5)",
            }}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500"></div>

            <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-white animate-bounce"></div>
              </div>
              <h3 className="text-3xl font-black mb-4 text-slate-800">Select Your Location</h3>
              <p className="text-slate-600 font-semibold text-lg max-w-2xl mx-auto leading-relaxed">
                Choose your city to discover available hospitals and connect with top medical professionals
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {availableCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-500 font-bold text-lg group overflow-hidden hover:-translate-y-1 ${
                    selectedCity === city.id
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 shadow-xl scale-105"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-lg hover:scale-102"
                  } ${city.available ? "cursor-pointer" : "cursor-pointer"}`}
                  style={{
                    opacity: city.available ? 1 : 0.75,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
                  <div className="relative flex flex-col items-center space-y-3">
                    <span className="font-black text-lg transition-all duration-300 group-hover:scale-105">{city.name}</span>
                    {city.available ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 transition-all duration-300 group-hover:scale-110" />
                        <span className="text-sm font-semibold text-green-600">Available</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-amber-500 transition-all duration-300 group-hover:scale-110" />
                        <span className="text-sm font-semibold text-amber-600">Coming Soon</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {selectedCity === "hyderabad" && (
              <div className="text-center p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-lg animate-in slide-in-from-bottom duration-500">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <CheckCircle className="w-8 h-8 text-green-500 animate-bounce" />
                  <span className="text-2xl font-black text-green-700">Perfect Choice!</span>
                </div>
                <p className="font-bold text-green-600 text-lg">Redirecting to available hospitals in Hyderabad...</p>
                <div className="mt-4 w-full bg-green-200 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full animate-pulse shadow-sm" style={{ width: "100%" }}></div>
                </div>
              </div>
            )}

            {showUnavailableMessage && selectedCity !== "hyderabad" && (
              <div className="text-center p-8 rounded-xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 shadow-lg">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Globe className="w-8 h-8 text-amber-500" />
                  <span className="font-black text-2xl text-amber-700">Coming Soon!</span>
                </div>
                <p className="font-semibold text-amber-700 text-lg leading-relaxed mb-6">
                  We are working on availability of service in your current location.
                  <br />
                  Stay tuned for updates in{" "}
                  <span className="font-black">{availableCities.find((c) => c.id === selectedCity)?.name}</span>!
                </p>
                <button
                  onClick={() => {
                    setSelectedCity("")
                    setShowUnavailableMessage(false)
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-xl font-bold hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 active:scale-95 relative overflow-hidden group"
                >
                  <span className="relative z-10">Select Another City</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Professional About Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black mb-6 bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
              What Makes QuickCare Special?
            </h3>
            <p className="text-xl text-slate-600 font-semibold max-w-5xl mx-auto leading-relaxed">
              Unlike traditional hospital systems, QuickCare doesn't just connect to{" "}
              <span className="font-black text-blue-600">one</span> hospital. Each hospital can have its{" "}
              <span className="font-black text-blue-600">own backend</span>, and QuickCare connects to all of them
              centrally — securely and in real time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Enhanced User Features */}
            <div
              className="group relative p-8 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-2xl font-black text-slate-800">For Patients</h4>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed">
                    Smart location detection shows only available hospitals
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed">
                    Real-time availability of doctors and slots
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed">
                    Secure appointments with JWT token-based access
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Calendar className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed">
                    All-in-one booking, ratings, and reminders
                  </span>
                </li>
              </ul>
            </div>

            {/* Enhanced Hospital Features */}
            <div
              className="group relative p-8 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400"></div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-2xl font-black text-slate-800">For Hospitals</h4>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed">
                    Self-service onboarding and backend integration
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed">
                    Modular integration - control your own data
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed">
                    Scalable infrastructure for any hospital size
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Users className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed">
                    Reach digital-first patients instantly
                  </span>
                </li>
              </ul>
            </div>

            {/* Enhanced Business Value */}
            <div
              className="group relative p-8 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 md:col-span-2 lg:col-span-1"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-400"></div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-400 rounded-2xl flex items-center justify-center shadow-lg">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-2xl font-black text-slate-800">Business Value</h4>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Globe className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed">
                    Expand reach to digital-first patients
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed">
                    Reduce admin workload via automated booking
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Shield className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed">
                    Maintain full control over backend systems
                  </span>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-slate-600 font-semibold leading-relaxed">Modern microservice architecture</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Professional Stats Section */}
        <div
          className="relative text-center py-16 rounded-2xl mb-20 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-400/20"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-12 text-white">QuickCare by the Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="group">
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">
                  2+
                </div>
                <div className="text-sm font-bold text-slate-300 uppercase tracking-wider">Partner Hospitals</div>
              </div>
              <div className="group">
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <div className="text-sm font-bold text-slate-300 uppercase tracking-wider">City Available</div>
              </div>
              <div className="group">
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-sm font-bold text-slate-300 uppercase tracking-wider">System Uptime</div>
              </div>
              <div className="group">
                <div className="text-5xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-3 group-hover:scale-110 transition-transform duration-300">
                  100%
                </div>
                <div className="text-sm font-bold text-slate-300 uppercase tracking-wider">Secure Bookings</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Professional Footer */}
      <footer
        className="mt-auto"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        }}
      >
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">
            {/* Enhanced Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">QuickCare</h3>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Healthcare Excellence</p>
                </div>
              </div>
              <p className="text-slate-400 font-semibold leading-relaxed">
                Your trusted healthcare partner, providing quality medical services and connecting you with the best
                healthcare professionals.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer group">
                  <Facebook className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer group">
                  <Twitter className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer group">
                  <Instagram className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer group">
                  <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-white" />
                </div>
              </div>
            </div>

            {/* Enhanced Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-black text-white uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/hospitals"
                    className="text-slate-400 hover:text-white transition-colors font-semibold hover:translate-x-1 transform duration-200 block"
                  >
                    Find Hospitals
                  </Link>
                </li>
                <li>
                  <Link
                    href="/doctors"
                    className="text-slate-400 hover:text-white transition-colors font-semibold hover:translate-x-1 transform duration-200 block"
                  >
                    Find Doctors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/appointments"
                    className="text-slate-400 hover:text-white transition-colors font-semibold hover:translate-x-1 transform duration-200 block"
                  >
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/emergency"
                    className="text-slate-400 hover:text-white transition-colors font-semibold hover:translate-x-1 transform duration-200 block"
                  >
                    Emergency Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/health-records"
                    className="text-slate-400 hover:text-white transition-colors font-semibold hover:translate-x-1 transform duration-200 block"
                  >
                    Health Records
                  </Link>
                </li>
              </ul>
            </div>

            {/* Enhanced Services */}
            <div className="space-y-6">
              <h4 className="text-xl font-black text-white uppercase tracking-wider">Services</h4>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                    <Shield className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-slate-400 font-semibold group-hover:text-white transition-colors">
                    Secure Patient Data
                  </span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                    <Clock className="w-4 h-4 text-green-400" />
                  </div>
                  <span className="text-slate-400 font-semibold group-hover:text-white transition-colors">
                    24/7 Support
                  </span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center group-hover:bg-red-500/30 transition-colors">
                    <Heart className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-slate-400 font-semibold group-hover:text-white transition-colors">
                    Quality Care
                  </span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                    <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-slate-400 font-semibold group-hover:text-white transition-colors">
                    Expert Doctors
                  </span>
                </li>
              </ul>
            </div>

            {/* Enhanced Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-black text-white uppercase tracking-wider">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                    <Phone className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </div>
                  <span className="text-slate-400 font-semibold group-hover:text-white transition-colors">
                    +1 (555) 123-CARE
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                    <Mail className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </div>
                  <span className="text-slate-400 font-semibold group-hover:text-white transition-colors">
                    support@quickcare.com
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                    <MessageCircle className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </div>
                  <span className="text-slate-400 font-semibold group-hover:text-white transition-colors">
                    Live Chat Support
                  </span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                    <MapPin className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </div>
                  <span className="text-slate-400 font-semibold group-hover:text-white transition-colors">
                    123 Healthcare Ave, Medical City
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom bar */}
          <div className="mt-12 pt-8 text-center" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="font-semibold text-slate-400">
                &copy; 2024 QuickCare Healthcare Management System. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors font-semibold">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors font-semibold">
                  Terms of Service
                </Link>
                <Link href="/accessibility" className="text-slate-400 hover:text-white transition-colors font-semibold">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
