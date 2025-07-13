"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Star, Phone, Menu, X, Heart, Shield, Clock, Mail, MessageCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"
import { ConnectionStatus } from "@/components/connection-status"
import { useAuth } from "@/contexts/auth-context"

interface Hospital {
  id: string
  name: string
  location: string
  description: string
  phone: string
  specialties: string[]
  rating: number
  doctorCount: number | string
  image: string
  status?: "online" | "offline"
}

const hospitals: Hospital[] = [
  {
    id: "hospa",
    name: "QuickCare Hospital A",
    location: "Downtown Medical District, City Center",
    description: "Premier healthcare facility with state-of-the-art equipment and experienced medical professionals.",
    phone: "+1 (555) 123-4567",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Pediatrics"],
    rating: 4.8,
    doctorCount: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "hospb",
    name: "QuickCare Hospital B",
    location: "Riverside Medical Campus, North District",
    description: "Comprehensive medical center specializing in advanced treatments and patient care.",
    phone: "+1 (555) 987-6543",
    specialties: ["Emergency Care", "Surgery", "Radiology", "Internal Medicine"],
    rating: 4.6,
    doctorCount: 0,
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function HomePage() {
  const [hospitalData, setHospitalData] = useState(hospitals)
  const [loading, setLoading] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { user, loading: authLoading } = useAuth();


  useEffect(() => {
    const fetchHospitalData = async () => {
      const updatedHospitals = await Promise.all(
        hospitals.map(async (hospital) => {
          try {
            const response = await fetch(`/api/hospitals/${hospital.id}/doctors`)

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            return {
              ...hospital,
              doctorCount: data.doctors?.length || 0,
              status: "online" as const,
            }
          } catch (error) {
            console.warn(
              `Could not fetch data for ${hospital.name}:`,
              error instanceof Error ? error.message : error
            )
            return {
              ...hospital,
              doctorCount: "N/A" as const,
              status: "offline" as const,
            }
          }
        }),
      )
      setHospitalData(updatedHospitals)
      setLoading(false)
    }

    fetchHospitalData()
  }, [])

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
      {/* Enhanced Header */}
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
                    <div className="hidden md:flex items-center space-x-4">
        {!loading && !user ? (
          <Link href="/login">
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              Login
            </Button>
          </Link>
        ) : (
          <span className="text-green-200 text-sm font-medium">Welcome, {user?.name}</span>
        )}
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
      <main className="container mx-auto px-6 py-8 flex-grow" style={{ marginTop: '140px' }}>
        <div className="mb-8">
          <h2 className="text-3xl font-black mb-2" style={{ color: '#2c3e50' }}>Available Hospitals</h2>
          <p className="text-gray-600 font-medium">Choose a hospital to book your appointment</p>
        </div>

        <div className="mb-8">
          <ConnectionStatus hospitals={hospitalData} />
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse" style={{
                background: '#ffffff',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                padding: '25px'
              }}>
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {hospitalData.map((hospital) => (
              <div key={hospital.id} className="transition-all duration-300 hover:-translate-y-1" style={{
                background: '#ffffff',
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden'
              }}>
                <div className="p-6 pb-4" style={{ background: '#f8f9fa', borderBottom: '2px solid #e9ecef' }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-black mb-2" style={{ color: '#2c3e50' }}>{hospital.name}</h3>
                      <div className="flex items-center text-gray-600 font-medium">
                        <MapPin className="w-4 h-4 mr-2" />
                        {hospital.location}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 px-3 py-1 rounded-full" style={{ background: '#fff3cd', color: '#856404' }}>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold">{hospital.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <img
                    src={hospital.image || "/placeholder.svg"}
                    alt={hospital.name}
                    className="w-full h-32 object-cover rounded-lg"
                    style={{ background: '#f8f9fa', border: '1px solid #e9ecef' }}
                  />

                  <p className="text-gray-600 font-medium leading-relaxed">{hospital.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.map((specialty) => (
                      <span key={specialty} className="px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full" style={{
                        background: '#e9ecef',
                        color: '#2c3e50'
                      }}>
                        {specialty}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm font-medium" style={{ color: '#2c3e50' }}>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      <span>
                        {hospital.doctorCount} {hospital.doctorCount === "N/A" ? "" : "Doctors Available"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <span>{hospital.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${hospital.status === "online" ? "bg-green-400 animate-pulse" : "bg-red-400"}`}
                        ></div>
                        <span className="text-xs font-bold uppercase tracking-wide">{hospital.status === "online" ? "Online" : "Offline"}</span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/hospital/${hospital.id}`} className="block">
                    <button className="w-full py-4 px-6 font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:-translate-y-1" style={{
                      background: '#2c3e50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      boxShadow: '0 2px 10px rgba(44, 62, 80, 0.1)'
                    }} onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#34495e'
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(44, 62, 80, 0.2)'
                    }} onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#2c3e50'
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(44, 62, 80, 0.1)'
                    }}>
                      View Details & Book Appointment
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
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