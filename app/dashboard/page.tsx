"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import {
  ArrowLeft,
  Heart,
  User,
  Calendar,
  Star,
  Clock,
  Phone,
  Mail,
  IndianRupee,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "../../contexts/auth-context"
import { useRouter } from "next/navigation"


interface Appointment {
  _id: string
  hospitalId: string
  doctorName: string
  specialization: string
  fee: number
  status: string
  appointmentDate: string
  transactionId: string
  queuePosition?: number
  estimatedWaitTime?: string
}

interface Review {
  _id: string
  hospitalId: string
  rating: number
  comment: string
  createdAt: string
}

export default function DashboardPage() {
  const { user, loading: authLoading, logout } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      fetchUserData()
    }
  }, [user, authLoading, router])

  const fetchUserData = async () => {
    try {
      // Fetch user appointments
      const appointmentsRes = await fetch("/api/user/appointments", {
        credentials: "include",
      })

      if (appointmentsRes.ok) {
        const appointmentsData = await appointmentsRes.json()
        setAppointments(appointmentsData.appointments || [])
      }

      // Fetch user reviews
      const reviewsRes = await fetch("/api/user/reviews", {
        credentials: "include",
      })

      if (reviewsRes.ok) {
        const reviewsData = await reviewsRes.json()
        setReviews(reviewsData.reviews || [])
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "booked":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
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
                  <p className="text-white/70 text-xs font-medium">Healthcare Dashboard</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium">Welcome back,</p>
                <p className="text-lg font-bold">{user.name}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="text-white border-white/20 hover:bg-white/10 bg-transparent"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-black mb-2" style={{ color: "#2c3e50" }}>
            Your Healthcare Dashboard
          </h2>
          <p className="text-gray-600 font-medium">
            Manage your appointments, view your medical history, and track your healthcare journey.
          </p>
        </div>

        {/* User Profile Card */}
        <Card className="mb-8 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="w-5 h-5 mr-2" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600 font-medium">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 font-medium">{user.phone}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Appointments and Reviews */}
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="appointments" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>My Appointments ({appointments.length})</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>My Reviews ({reviews.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-4">
            {appointments.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No Appointments Yet</h3>
                  <p className="text-gray-600 mb-4">You haven't booked any appointments yet.</p>
                  <Link href="/locations">
                    <Button className="bg-slate-700 hover:bg-slate-800">Book Your First Appointment</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {appointments.map((appointment) => (
                  <Card key={appointment._id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-800">Dr. {appointment.doctorName}</h3>
                          <p className="text-gray-600 capitalize">{appointment.specialization}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(appointment.status)}
                          <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {new Date(appointment.appointmentDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <IndianRupee className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">₹{appointment.fee}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400">Transaction ID:</span>
                          <span className="text-gray-600 font-mono text-xs">{appointment.transactionId}</span>
                        </div>
                        {appointment.queuePosition && (
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400">Queue Position:</span>
                            <span className="text-gray-600 font-bold">#{appointment.queuePosition}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            {reviews.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No Reviews Yet</h3>
                  <p className="text-gray-600 mb-4">You haven't written any reviews yet.</p>
                  <Link href="/locations">
                    <Button className="bg-slate-700 hover:bg-slate-800">Visit a Hospital to Leave a Review</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {reviews.map((review) => (
                  <Card key={review._id} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-2">
                          {Array.from({ length: review.rating }, (_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-sm text-gray-500">({review.rating}/5)</span>
                        </div>
                        <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>

                      {review.comment && <p className="text-gray-700 leading-relaxed">"{review.comment}"</p>}

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500">Review for Hospital ID: {review.hospitalId}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
