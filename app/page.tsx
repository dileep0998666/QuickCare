"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Star, Phone, Menu, X, Heart, Shield, Clock, Mail, MessageCircle, Facebook, Twitter, Instagram, Linkedin, CheckCircle, Zap, Globe, Building, Calendar, Award } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const handleCitySelect = (cityId: string) => {
    const city = availableCities.find(c => c.id === cityId)
    setSelectedCity(cityId)
    
    if (city?.available) {
      setShowUnavailableMessage(false)
      // Navigate to locations page after a brief delay
      setTimeout(() => {
        router.push('/locations')
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
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ 
      fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace",
      background: '#f8f9fa',
      color: '#2c3e50',
      lineHeight: '1.6'
    }}>
      {/* Optimized Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${headerVisible ? 'translate-y-0' : '-translate-y-full'}`} style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: 'white',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="container mx-auto px-6">
          {/* Single main navigation bar */}
          <div className="py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight">QuickCare</h1>
                  <p className="text-white/70 text-xs font-medium">Healthcare Management</p>
                </div>
              </div>

              {/* Desktop Navigation - Left aligned */}
              <nav className="hidden md:flex items-center space-x-6 flex-1 justify-start ml-12">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white/80 hover:text-white transition-all duration-200 text-sm font-medium uppercase tracking-wide hover:scale-105"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* System Status - Right aligned */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-200 text-sm font-medium">System Online</span>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden">
                <div className="pt-4 pb-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <nav className="space-y-1">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block py-2 text-white/80 hover:text-white transition-colors duration-200 uppercase tracking-wide font-medium text-sm"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  {/* Mobile System Status */}
                  <div className="flex items-center space-x-2 mt-4 pt-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-200 text-sm font-medium">System Online</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-grow" style={{ marginTop: '100px' }}>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#2c3e50' }}>
            Welcome to QuickCare
          </h2>
          <p className="text-xl text-gray-600 font-medium mb-2">
            Your Modern Healthcare Appointment Platform
          </p>
          <p className="text-lg text-gray-500 font-medium">
            Think of it like <span className="font-bold text-blue-600">BookMyShow, but for hospitals</span>
          </p>
        </div>

        {/* Location Selection */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="p-8 rounded-lg" style={{
            background: '#ffffff',
            border: '2px solid #e9ecef',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)'
          }}>
            <div className="text-center mb-8">
              <MapPin className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-2xl font-black mb-2" style={{ color: '#2c3e50' }}>
                Select Your Location
              </h3>
              <p className="text-gray-600 font-medium">
                Choose your city to find available hospitals and doctors
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {availableCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => handleCitySelect(city.id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 font-medium ${
                    selectedCity === city.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  } ${city.available ? 'cursor-pointer' : 'cursor-pointer'}`}
                  style={{
                    opacity: city.available ? 1 : 0.7,
                  }}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span className="font-bold">{city.name}</span>
                    {city.available && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  {!city.available && (
                    <p className="text-xs text-gray-500 mt-1">Coming Soon</p>
                  )}
                </button>
              ))}
            </div>

            {selectedCity === "hyderabad" && (
              <div className="text-center p-4 rounded-lg" style={{ background: '#d4edda', color: '#155724' }}>
                <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                <p className="font-bold">Great! Redirecting to available hospitals in Hyderabad...</p>
              </div>
            )}

            {showUnavailableMessage && selectedCity !== "hyderabad" && (
              <div className="text-center p-6 rounded-lg" style={{ 
                background: '#fff3cd', 
                border: '1px solid #ffeaa7',
                color: '#856404' 
              }}>
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Globe className="w-6 h-6" />
                  <span className="font-black text-lg">Coming Soon!</span>
                </div>
                <p className="font-medium text-sm leading-relaxed">
                  We are working on availability of service in your current location. 
                  <br />
                  Stay tuned for updates in <span className="font-bold">{availableCities.find(c => c.id === selectedCity)?.name}</span>!
                </p>
                <button
                  onClick={() => {
                    setSelectedCity("")
                    setShowUnavailableMessage(false)
                  }}
                  className="mt-4 px-6 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
                >
                  Select Another City
                </button>
              </div>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black mb-4" style={{ color: '#2c3e50' }}>
              What Makes QuickCare Special?
            </h3>
            <p className="text-lg text-gray-600 font-medium max-w-3xl mx-auto">
              Unlike traditional hospital systems, QuickCare doesn't just connect to <span className="font-bold">one</span> hospital. 
              Each hospital can have its <span className="font-bold">own backend</span>, and QuickCare connects to all of them centrally — securely and in real time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* User Features */}
            <div className="p-6 rounded-lg" style={{
              background: '#ffffff',
              border: '2px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
            }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <h4 className="text-lg font-black" style={{ color: '#2c3e50' }}>For Patients</h4>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Smart location detection shows only available hospitals</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Zap className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Real-time availability of doctors and slots</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Secure appointments with JWT token-based access</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Calendar className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">All-in-one booking, ratings, and reminders</span>
                </li>
              </ul>
            </div>

            {/* Hospital Features */}
            <div className="p-6 rounded-lg" style={{
              background: '#ffffff',
              border: '2px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
            }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-green-500" />
                </div>
                <h4 className="text-lg font-black" style={{ color: '#2c3e50' }}>For Hospitals</h4>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Self-service onboarding and backend integration</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Globe className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Modular integration - control your own data</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Zap className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Scalable infrastructure for any hospital size</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Users className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Reach digital-first patients instantly</span>
                </li>
              </ul>
            </div>

            {/* Business Value */}
            <div className="p-6 rounded-lg md:col-span-2 lg:col-span-1" style={{
              background: '#ffffff',
              border: '2px solid #e9ecef',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
            }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-500" />
                </div>
                <h4 className="text-lg font-black" style={{ color: '#2c3e50' }}>Business Value</h4>
              </div>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-3">
                  <Globe className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Expand reach to digital-first patients</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Reduce admin workload via automated booking</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Maintain full control over backend systems</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Zap className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 font-medium">Modern microservice architecture</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-center py-12 rounded-lg mb-16" style={{
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          color: 'white'
        }}>
          <h3 className="text-2xl font-black mb-8">QuickCare by the Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-black text-blue-400 mb-2">2+</div>
              <div className="text-sm font-medium text-white/80">Partner Hospitals</div>
            </div>
            <div>
              <div className="text-3xl font-black text-green-400 mb-2">1</div>
              <div className="text-sm font-medium text-white/80">City Available</div>
            </div>
            <div>
              <div className="text-3xl font-black text-purple-400 mb-2">24/7</div>
              <div className="text-sm font-medium text-white/80">System Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-black text-yellow-400 mb-2">100%</div>
              <div className="text-sm font-medium text-white/80">Secure Bookings</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto" style={{ background: '#2c3e50', color: 'white' }}>
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-black">QuickCare</h3>
                  <p className="text-white/70 text-sm font-medium">Healthcare Management</p>
                </div>
              </div>
              <p className="text-white/70 text-sm font-medium leading-relaxed">
                Your trusted healthcare partner, providing quality medical services and connecting you with the best healthcare professionals.
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-white/70 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-black uppercase tracking-wide">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/hospitals" className="text-white/70 hover:text-white transition-colors font-medium">Find Hospitals</Link></li>
                <li><Link href="/doctors" className="text-white/70 hover:text-white transition-colors font-medium">Find Doctors</Link></li>
                <li><Link href="/appointments" className="text-white/70 hover:text-white transition-colors font-medium">Book Appointment</Link></li>
                <li><Link href="/emergency" className="text-white/70 hover:text-white transition-colors font-medium">Emergency Services</Link></li>
                <li><Link href="/health-records" className="text-white/70 hover:text-white transition-colors font-medium">Health Records</Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-black uppercase tracking-wide">Services</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-white/70 font-medium">Secure Patient Data</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-white/70 font-medium">24/7 Support</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-white/70 font-medium">Quality Care</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-white/70 font-medium">Expert Doctors</span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-black uppercase tracking-wide">Contact Us</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 font-medium">+1 (555) 123-CARE</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 font-medium">support@quickcare.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 font-medium">Live Chat Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-white/70" />
                  <span className="text-white/70 font-medium">123 Healthcare Ave, Medical City</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 text-center text-sm text-white/70" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
              <p className="font-medium">&copy; 2024 QuickCare Healthcare Management System. All rights reserved.</p>
              <div className="flex space-x-4">
                <Link href="/privacy" className="hover:text-white transition-colors font-medium">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors font-medium">Terms of Service</Link>
                <Link href="/accessibility" className="hover:text-white transition-colors font-medium">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}