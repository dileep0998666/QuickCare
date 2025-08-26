"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Alert, AlertDescription } from "../../components/ui/alert"
import { Eye, EyeOff, Heart, ArrowLeft, Mail, Lock } from "lucide-react"
import { useAuth } from "../../contexts/auth-context"

declare global {
  interface Window {
    google: any;
    handleCredentialResponse?: (response: any) => void;
  }
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login, googleLogin } = useAuth()
  const router = useRouter()

  const handleGoogleCallback = useCallback(async (response: any) => {
    try {
      setLoading(true)
      setError("")

      const result = await googleLogin(response.credential)

      if (result.success) {
        router.push("/dashboard")
      } else {
        setError(result.message || 'Google sign-in failed')
      }
    } catch (error) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [googleLogin, router])

  useEffect(() => {
    // Debug: Check if environment variable is available
    console.log('Environment check:', {
      googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      nodeEnv: process.env.NODE_ENV
    })
    
    // Set global callback function
    window.handleCredentialResponse = handleGoogleCallback
    
    // Load Google Sign-In script
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    
    const handleScriptLoad = () => {
      if (window.google) {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        console.log('Google Client ID:', clientId) // Debug log
        
        if (!clientId) {
          console.error('Google Client ID not found')
          setError('Google Sign-In configuration error')
          return
        }
        
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleGoogleCallback,
        })
        
        // Render the button
        const buttonElement = document.getElementById("google-signin-button")
        if (buttonElement) {
          window.google.accounts.id.renderButton(
            buttonElement,
            { 
              theme: "outline", 
              size: "large",
              width: "100%",
              text: "continue_with"
            }
          )
        }
      }
    }
    
    script.onload = handleScriptLoad
    document.body.appendChild(script)

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
      if (existingScript && document.body.contains(existingScript)) {
        document.body.removeChild(existingScript)
      }
      if (window.handleCredentialResponse) {
        delete window.handleCredentialResponse
      }
    }
  }, [handleGoogleCallback])



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(email, password)

    if (result.success) {
      router.push("/dashboard")
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col"
      style={{
        fontFamily: "'JetBrains Mono', 'Consolas', 'Monaco', monospace",
        background: "#f8f9fa",
        color: "#2c3e50",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
          color: "white",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight">QuickCare</h1>
                  <p className="text-white/70 text-xs font-medium">Healthcare Management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-200 text-sm font-medium">System Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Card
            className="border-0 shadow-lg backdrop-blur-sm"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: "16px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-black" style={{ color: "#2c3e50" }}>
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600 font-medium">Sign in to your QuickCare account</CardDescription>
            </CardHeader>

            <CardContent>
              {/* Google Sign In Button */}
              <div className="mb-6">
                <div id="google-signin-button" className="w-full"></div>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-medium">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-bold text-gray-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 focus:shadow-lg"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-bold text-gray-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-12 border-2 border-gray-200 focus:border-blue-500 transition-all duration-300 hover:border-gray-300 focus:shadow-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 font-bold text-sm uppercase tracking-wide transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
                    color: "white",
                  }}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 font-medium">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-bold">
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
