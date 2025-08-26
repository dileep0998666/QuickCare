"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Heart } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

interface HeaderProps {
  title?: string
  subtitle?: string
  showNavigation?: boolean
  className?: string
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

export function Header({ 
  title = "QuickCare", 
  subtitle = "Healthcare Excellence", 
  showNavigation = true,
  className = ""
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        headerVisible ? "translate-y-0" : "-translate-y-full"
      } ${className}`}
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
                  {title}
                </h1>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{subtitle}</p>
              </div>
            </div>

            {/* Professional Navigation */}
            {showNavigation && (
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
            )}

            {/* Enhanced Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {!loading && !user ? (
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 active:scale-95 relative overflow-hidden group">
                    <span className="relative z-10">Login</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              ) : user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-3 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                    <span className="text-green-200 text-sm font-semibold">Welcome, {user.name}</span>
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
              ) : null}
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
                {showNavigation && (
                  <nav className="space-y-3 mb-6">
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
                )}
                <div
                  className="flex items-center justify-between pt-4 px-4"
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
  )
}