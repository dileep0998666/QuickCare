"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Phone, Clock, Star, Users, IndianRupee } from "lucide-react"
import Link from "next/link"
import { BookingModal } from "@/components/booking-modal"

interface Doctor {
  _id: string
  name: string
  specialization: string
  fee: number
  currency: string
  active: boolean
  schedule: string[]
}

interface Hospital {
  id: string
  name: string
  location: string
  description: string
  phone: string
  workingHours: string
  rating: number
}

const hospitalInfo: Record<string, Hospital> = {
  hospa: {
    id: "hospa",
    name: "QuickCare Hospital A",
    location: "Downtown Medical District, City Center",
    description:
      "Premier healthcare facility with state-of-the-art equipment and experienced medical professionals. We provide comprehensive medical services with a focus on patient care and advanced treatments.",
    phone: "+1 (555) 123-4567",
    workingHours: "24/7 Emergency | OPD: 8:00 AM - 8:00 PM",
    rating: 4.8,
  },
  hospb: {
    id: "hospb",
    name: "QuickCare Hospital B",
    location: "Riverside Medical Campus, North District",
    description:
      "Comprehensive medical center specializing in advanced treatments and patient care. Our team of experienced doctors provides quality healthcare services across multiple specializations.",
    phone: "+1 (555) 987-6543",
    workingHours: "24/7 Emergency | OPD: 9:00 AM - 7:00 PM",
    rating: 4.6,
  },
}

export default function HospitalPage() {
  const params = useParams()
  const hospitalId = params.id as string
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [rating, setRating] = useState<number>(0)
  const [reviewText, setReviewText] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [reviews, setReviews] = useState<{ rating: number; comment: string; createdAt: string }[]>([])

  const hospital = hospitalInfo[hospitalId]

  useEffect(() => {
    if (hospital) {
      fetchDoctors()
      fetchReviews()
    }
  }, [hospital])

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`/api/hospitals/${hospitalId}/doctors`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setDoctors(data.doctors || [])
    } catch (error) {
      console.error("Error fetching doctors:", error)
      setDoctors([])
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/hospitals/${hospitalId}/review`)
      const data = await res.json()
      if (res.ok) {
        setReviews(data.reviews || [])
      } else {
        throw new Error("Failed to load reviews")
      }
    } catch (err) {
      console.error("Fetch Reviews Error:", err)
    }
  }

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setShowBookingModal(true)
  }

 const submitReview = async () => {
  if (rating === 0) return alert("Please select a rating before submitting");
  setSubmitting(true);

  try {
    const res = await fetch(`/api/hospitals/${hospitalId}/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating, comment: reviewText }),
    });

    let data: any = {};
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    } else {
      const text = await res.text();
      console.error("❌ Unexpected (non-JSON) response:", text);
      throw new Error("Server returned non-JSON response");
    }

    if (!res.ok) {
      throw new Error(data.message || "Failed to submit review");
    }

    alert("✅ Review submitted");
    setRating(0);
    setReviewText("");
  } catch (error: any) {
    alert(`❌ Error: ${error.message}`);
  } finally {
    setSubmitting(false);
  }
};

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Hospital Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-800 text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-white hover:bg-slate-700">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">QuickCare</h1>
                <p className="text-slate-300 text-sm">Healthcare Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-slate-300">System Online</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hospital Info */}
        <Card className="mb-8 border-0 shadow-md">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl text-slate-800">{hospital.name}</CardTitle>
                <CardDescription className="flex items-center mt-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {hospital.location}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-medium">{hospital.rating}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600">{hospital.description}</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-slate-600">
                <Phone className="w-4 h-4 mr-2" />
                <span>{hospital.phone}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>{hospital.workingHours}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doctors Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Available Doctors</h2>
          <p className="text-slate-600">Choose a doctor to book your appointment</p>
        </div>

        {/* Doctors List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {loading ? (
            [1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : doctors.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">No Doctors Available</h3>
                <p className="text-slate-600">Please check back later or contact the hospital directly.</p>
              </CardContent>
            </Card>
          ) : (
            doctors.map((doctor) => (
              <Card key={doctor._id} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-slate-800">{doctor.name}</CardTitle>
                      <CardDescription className="capitalize">{doctor.specialization}</CardDescription>
                    </div>
                    <Badge
                      variant={doctor.active ? "default" : "secondary"}
                      className={doctor.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {doctor.active ? "Available" : "Offline"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Consultation Fee:</span>
                    <div className="flex items-center font-medium text-slate-800">
                      <IndianRupee className="w-4 h-4" />
                      <span>{doctor.fee}</span>
                    </div>
                  </div>
                  {doctor.schedule?.length > 0 && (
                    <div>
                      <span className="text-sm text-slate-600 block mb-2">Schedule:</span>
                      <div className="flex flex-wrap gap-1">
                        {doctor.schedule.map((day, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <Button
                    className="w-full bg-slate-700 hover:bg-slate-800"
                    disabled={!doctor.active}
                    onClick={() => handleBookAppointment(doctor)}
                  >
                    {doctor.active ? "Book Appointment" : "Currently Unavailable"}
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Reviews Display */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">Patient Reviews</h3>
          {reviews.length > 0 ? (
  reviews.map((r, idx) => (
    <div key={idx} className="mb-4 border-b pb-2">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-slate-800">{r.userId?.name || "Anonymous"}</span>
        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: r.rating }, (_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
      <p className="text-slate-700 text-sm mt-1">{r.comment}</p>
    </div>
  ))
) : (
  <p className="text-slate-500 text-sm">No reviews yet.</p>
)}

        </div>

        {/* Review Form */}
        <Card className="mb-12 border-t pt-6">
          <CardContent>
            <p className="text-sm font-semibold text-slate-700 mb-2">Leave a Review:</p>
            <div className="flex items-center space-x-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`w-6 h-6 rounded-full text-yellow-500 ${rating >= star ? "bg-yellow-200" : "bg-gray-200"}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              className="w-full p-2 border rounded text-sm"
              rows={2}
              placeholder="Write your review (optional)..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <Button
              onClick={submitReview}
              disabled={submitting}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          hospital={hospital}
          onClose={() => {
            setShowBookingModal(false)
            setSelectedDoctor(null)
          }}
        />
      )}
    </div>
  )
}
