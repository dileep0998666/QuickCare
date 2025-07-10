"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IndianRupee, User, MapPin, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface Doctor {
  _id: string
  name: string
  specialization: string
  fee: number
  currency: string
}

interface Hospital {
  id: string
  name: string
  location: string
}

interface BookingModalProps {
  doctor: Doctor
  hospital: Hospital
  onClose: () => void
}

interface BookingData {
  name: string
  age: string
  gender: string
  reason: string
  location: string
}

interface PaymentResult {
  success: boolean
  data?: {
    transactionId: string
    patientId: string
    doctorName: string
    specialization: string
    queuePosition: number
    estimatedWaitTime: string
    amount: number
    currency: string
  }
  message?: string
}

export function BookingModal({ doctor, hospital, onClose }: BookingModalProps) {
  const router = useRouter()
  const [step, setStep] = useState<"form" | "payment" | "success">("form")
  const [loading, setLoading] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData>({
    name: "",
    age: "",
    gender: "",
    reason: "",
    location: "",
  })
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null)

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  const isFormValid = () => {
    return (
      bookingData.name.trim() &&
      bookingData.age.trim() &&
      bookingData.gender &&
      bookingData.reason.trim() &&
      bookingData.location.trim()
    )
  }

  const handleSubmit = async () => {
    if (!isFormValid()) return

    setLoading(true)
    try {
      const response = await fetch(`/api/hospitals/${hospital.id}/doctors/${doctor._id}/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingData,
          age: Number.parseInt(bookingData.age),
          paymentMethod: "mock",
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setPaymentResult(result)
        setStep("success")
      } else {
        alert(result.message || "Booking failed. Please try again.")
      }
    } catch (error) {
      console.error("Booking error:", error)
      alert(error.message || "An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleViewStatus = () => {
    if (paymentResult?.data) {
      router.push(`/status?hospital=${hospital.id}&doctor=${doctor._id}&name=${encodeURIComponent(bookingData.name)}`)
      onClose()
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === "form" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl text-slate-800">Book Appointment</DialogTitle>
              <DialogDescription>Fill in your details to book an appointment with Dr. {doctor.name}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Doctor Info */}
              <Card className="border-slate-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Dr. {doctor.name}
                  </CardTitle>
                  <CardDescription className="capitalize">{doctor.specialization}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-slate-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {hospital.name}
                    </div>
                    <div className="flex items-center font-medium">
                      <IndianRupee className="w-4 h-4" />
                      <span>{doctor.fee}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Patient Form */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={bookingData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={bookingData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    placeholder="Enter your age"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={bookingData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={bookingData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Your location"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Reason for Visit *</Label>
                <Textarea
                  id="reason"
                  value={bookingData.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  placeholder="Describe your symptoms or reason for visit"
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || loading}
                  className="bg-slate-700 hover:bg-slate-800"
                >
                  {loading ? "Processing..." : "Book & Pay"}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "success" && paymentResult && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl text-green-600 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Appointment Booked Successfully!
              </DialogTitle>
              <DialogDescription>Your appointment has been confirmed and payment processed.</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg text-green-800">Booking Confirmation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Transaction ID:</span>
                      <p className="font-mono font-medium">{paymentResult.data?.transactionId}</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Queue Position:</span>
                      <p className="font-medium">{paymentResult.data?.queuePosition}</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Estimated Wait:</span>
                      <p className="font-medium">{paymentResult.data?.estimatedWaitTime}</p>
                    </div>
                    <div>
                      <span className="text-slate-600">Amount Paid:</span>
                      <p className="font-medium flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        {paymentResult.data?.amount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Appointment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Doctor:</span>
                    <span className="font-medium">Dr. {paymentResult.data?.doctorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Specialization:</span>
                    <span className="font-medium capitalize">{paymentResult.data?.specialization}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Patient:</span>
                    <span className="font-medium">{bookingData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Hospital:</span>
                    <span className="font-medium">{hospital.name}</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleViewStatus} className="bg-slate-700 hover:bg-slate-800">
                  View Queue Status
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
